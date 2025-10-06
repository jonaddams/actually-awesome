"use client";

import Viewer from "@/components/viewer";

export default function ViewerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1414]">
      {/* Header */}
      <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="!mb-0">Document Viewer</h1>
        </div>
      </header>

      {/* Viewer Container */}
      <main className="h-[calc(100vh-73px)] max-w-7xl mx-auto px-6">
        <Viewer document="/documents/nutrient-sample-signed-document-global-trust.pdf" />
      </main>
    </div>
  );
}
