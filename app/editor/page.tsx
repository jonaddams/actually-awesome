"use client";

import Script from "next/script";
import { useState } from "react";
import DocumentAuthoring from "@/components/document-authoring";

export default function EditorPage() {
  const [sdkReady, setSdkReady] = useState(false);
  const docAuthVersion =
    process.env.NEXT_PUBLIC_DOCAUTH_VERSION || "document-authoring-1.8.2-umd";

  return (
    <>
      {/* Load Document Authoring SDK only for this page */}
      <Script
        src={`https://document-authoring.cdn.nutrient.io/releases/${docAuthVersion}.js`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
        onError={() => console.error("Failed to load Document Authoring SDK")}
      />

      <div className="min-h-screen bg-white dark:bg-[#1a1414]">
        {/* Header */}
        <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <h1 className="!mb-0">Document Editor</h1>
          </div>
        </header>

        {/* Editor Container */}
        <main className="h-[calc(100vh-73px)]">
          {sdkReady ? (
            <DocumentAuthoring
              document="/documents/sample-invoice.docx"
              onEditorReady={(editor) => console.log("Editor ready:", editor)}
              className="w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-[var(--warm-gray-400)] border-t-[var(--digital-pollen)] rounded-full animate-spin mb-4" />
                <p className="text-[var(--warm-gray-600)]">
                  Loading Document Authoring SDK...
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
