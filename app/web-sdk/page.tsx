import Link from "next/link";

export default function WebSDKPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1414]">
      {/* Header */}
      <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-2">
            ← Back to Home
          </Link>
          <h1 className="!mb-0">Web SDK Samples</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="!mb-6">Available Samples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Document Generator Sample */}
            <Link
              href="/web-sdk/document-generator"
              className="block p-6 border border-[var(--warm-gray-400)] rounded-lg hover:opacity-70 transition-opacity"
            >
              <h3 className="!mb-3">Document Generator</h3>
              <p className="text-sm opacity-60">
                Create professional documents using templates, data, and the Document Authoring SDK. Generate DOCX and PDF documents through an interactive wizard.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
