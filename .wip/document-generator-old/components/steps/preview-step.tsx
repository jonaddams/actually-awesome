"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../wizard-context";

export default function PreviewStep() {
  const { state, dispatch } = useWizard();
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // Create download URL when DOCX document is available
  useEffect(() => {
    if (state.docxDocument) {
      // Create a blob URL for the DOCX
      const blob = new Blob([state.docxDocument], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Cleanup on unmount
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [state.docxDocument]);

  const handleDownloadDocx = () => {
    if (!downloadUrl) return;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `document-${Date.now()}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConvertToPdf = async () => {
    if (!state.docxDocument) {
      dispatch({
        type: "SET_ERROR",
        payload: "No document available to convert",
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      if (!window.NutrientDocumentAuthoring) {
        throw new Error("Document Authoring SDK not loaded");
      }

      const docAuth = window.NutrientDocumentAuthoring;

      // Convert DOCX to PDF
      const pdfBlob = await docAuth.convertToPdf(state.docxDocument);

      // Convert Blob to ArrayBuffer for storage
      const arrayBuffer = await pdfBlob.arrayBuffer();

      dispatch({ type: "SET_PDF_DOCUMENT", payload: arrayBuffer });
      dispatch({ type: "SET_ERROR", payload: null });

      // Auto-advance to download step
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to convert document to PDF",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  if (!state.docxDocument) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📄</div>
        <h2 className="text-2xl font-bold mb-2">No Document Generated</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Go back to the previous step to generate your document
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Preview Your Document</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Your DOCX document has been generated successfully
        </p>
      </div>

      {/* Success Message */}
      <div className="bg-[var(--data-green)] bg-opacity-10 border-2 border-[var(--data-green)] rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✓</div>
        <h3 className="text-xl font-bold mb-2 text-[var(--data-green)]">
          Document Generated Successfully!
        </h3>
        <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Your document is ready. You can download the DOCX file or convert it to PDF.
        </p>
      </div>

      {/* Preview Info Card */}
      <div className="bg-[var(--warm-gray-100)] dark:bg-[#1a1414] rounded-xl p-6 border border-[var(--warm-gray-400)]">
        <h3 className="font-semibold mb-4">Document Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-[var(--warm-gray-400)]">
            <span className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
              Format:
            </span>
            <span className="font-semibold">DOCX</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[var(--warm-gray-400)]">
            <span className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
              Template:
            </span>
            <span className="font-semibold capitalize">{state.template}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
              Size:
            </span>
            <span className="font-semibold">
              {(state.docxDocument.byteLength / 1024).toFixed(2)} KB
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          type="button"
          onClick={handleDownloadDocx}
          className="btn btn-secondary px-6"
        >
          Download DOCX
        </button>

        <button
          type="button"
          onClick={handleConvertToPdf}
          disabled={state.isLoading}
          className="btn btn-yellow px-6"
        >
          {state.isLoading ? "Converting..." : "Convert to PDF →"}
        </button>
      </div>

      {/* Help Text */}
      <div className="text-center pt-4">
        <p className="text-sm text-[var(--warm-gray-600)]">
          The DOCX file contains all your data formatted according to the template.
          <br />
          Convert to PDF for a final, shareable version.
        </p>
      </div>
    </div>
  );
}
