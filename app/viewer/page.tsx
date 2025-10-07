"use client";

import Script from "next/script";
import { useState } from "react";
import Viewer from "@/components/viewer";

export default function ViewerPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const webSDKVersion = process.env.NEXT_PUBLIC_WEB_SDK_VERSION || "1.7.0";

  return (
    <>
      {/* Load NutrientViewer SDK only for this page */}
      <Script
        src={`https://cdn.cloud.pspdfkit.com/pspdfkit-web@${webSDKVersion}/nutrient-viewer.js`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />

      <div className="min-h-screen bg-white dark:bg-[#1a1414]">
        {/* Header */}
        <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="!mb-0">Document Viewer</h1>
          </div>
        </header>

        {/* Viewer Container */}
        <main className="h-[calc(100vh-73px)] max-w-7xl mx-auto px-6">
          {sdkReady ? (
            <Viewer document="/documents/nutrient-sample-signed-document-global-trust.pdf" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-[var(--warm-gray-600)]">Loading viewer...</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
