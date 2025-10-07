import Link from "next/link";

export default function APIPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1414]">
      {/* Header */}
      <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-2">
            ← Back to Home
          </Link>
          <h1 className="!mb-0">Nutrient API Samples</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center py-20">
          <h2 className="!mb-6">Coming Soon</h2>
          <p className="text-xl opacity-60">
            Nutrient API samples and demos will be available here soon.
          </p>
        </div>
      </main>
    </div>
  );
}
