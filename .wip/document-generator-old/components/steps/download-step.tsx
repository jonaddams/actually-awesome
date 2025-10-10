"use client";

import { useEffect, useRef } from "react";
import { useWizard } from "../wizard-context";

export default function DownloadStep() {
  const { state, dispatch } = useWizard();
  const viewerContainerRef = useRef<HTMLDivElement>(null);
  const viewerInstanceRef = useRef<any>(null);

  // Initialize PDF viewer when PDF is available
  useEffect(() => {
    const initViewer = async () => {
      if (
        !state.pdfDocument ||
        !viewerContainerRef.current ||
        !window.NutrientViewer
      ) {
        return;
      }

      // Clean up previous instance
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.unmount();
        viewerInstanceRef.current = null;
      }

      try {
        const licenseKey = process.env.NEXT_PUBLIC_LICENSE_KEY;
        if (!licenseKey) {
          throw new Error("License key not found");
        }

        // Load PDF into viewer
        const instance = await window.NutrientViewer.load({
          container: viewerContainerRef.current,
          document: state.pdfDocument,
          licenseKey,
          baseUrl: `https://cdn.cloud.pspdfkit.com/pspdfkit-web@${process.env.NEXT_PUBLIC_WEB_SDK_VERSION || "1.7.0"}/`,
        });

        viewerInstanceRef.current = instance;
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to load PDF viewer",
        });
      }
    };

    initViewer();

    // Cleanup on unmount
    return () => {
      if (viewerInstanceRef.current) {
        viewerInstanceRef.current.unmount();
        viewerInstanceRef.current = null;
      }
    };
  }, [state.pdfDocument, dispatch]);

  const handleDownloadPdf = () => {
    if (!state.pdfDocument) return;

    const blob = new Blob([state.pdfDocument], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `document-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  if (!state.pdfDocument) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-2">No PDF Available</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Go back to the previous step to convert your document to PDF
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your PDF is Ready!</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Preview and download your final document
        </p>
      </div>

      {/* Success Banner */}
      <div className="bg-[var(--data-green)] bg-opacity-10 border-2 border-[var(--data-green)] rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">✓</span>
          <div className="text-left">
            <h3 className="font-bold text-[var(--data-green)]">
              PDF Generated Successfully
            </h3>
            <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
              Your document is ready to download and share
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleDownloadPdf}
          className="btn btn-yellow px-8"
        >
          Download PDF
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="border-2 border-[var(--warm-gray-400)] rounded-xl overflow-hidden bg-[var(--warm-gray-100)]">
        <div
          ref={viewerContainerRef}
          className="w-full"
          style={{ height: "600px" }}
        />
      </div>

      {/* Document Info */}
      <div className="bg-[var(--warm-gray-100)] dark:bg-[#1a1414] rounded-xl p-6 border border-[var(--warm-gray-400)]">
        <h3 className="font-semibold mb-4">Document Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-1">
              Template:
            </p>
            <p className="font-semibold capitalize">{state.template}</p>
          </div>
          <div>
            <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-1">
              Format:
            </p>
            <p className="font-semibold">PDF</p>
          </div>
          <div>
            <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-1">
              Size:
            </p>
            <p className="font-semibold">
              {(state.pdfDocument.byteLength / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="text-center pt-4">
        <p className="text-sm text-[var(--warm-gray-600)] mb-3">
          Want to create another document?
        </p>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="btn btn-secondary"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
