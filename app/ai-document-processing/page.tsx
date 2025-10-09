import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AIDocumentProcessingHome() {
  return (
    <div className="min-h-screen bg-[var(--warm-gray-100)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <h1 className="">Nutrient AI Document Processing</h1>
          <p className="text-sm text-[var(--warm-gray-600)] mt-4 !mb-4">
            Formerly known as XtractFlow
          </p>
          <p className="text-xl text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mx-auto">
            Explore interactive samples showcasing AI-powered document
            classification, data extraction, and validation capabilities.
          </p>
          <p className="text-xl text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mx-auto">
            Each sample demonstrates real-world use cases for automating
            document workflows.
          </p>
        </div>

        {/* API Information */}
        <div className="bg-white dark:bg-[#1a1414] rounded-2xl shadow-xl p-8 border border-[var(--warm-gray-400)] mb-8">
          <h2 className="!mb-4">About Nutrient AI Document Processing</h2>
          <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-6">
            Nutrient AI Document Processing provides powerful APIs for
            automating document-centric workflows. The platform combines machine
            learning models with rule-based validation to deliver accurate,
            production-ready results.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3 className="!mb-2">Classification</h3>
              <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
                Automatically identify document types and route them to
                appropriate workflows.
              </p>
            </div>
            <div>
              <h3 className="!mb-2">Extraction</h3>
              <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
                Extract structured data from unstructured documents with high
                accuracy.
              </p>
            </div>
            <div>
              <h3 className="!mb-2">Validation</h3>
              <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
                Built-in validation ensures extracted data meets business rules
                and standards.
              </p>
            </div>
          </div>
        </div>

        {/* Sample Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Invoice Management Sample */}
          <Link
            href="/ai-document-processing/invoices"
            className="group block bg-white dark:bg-[#1a1414] rounded-2xl shadow-xl overflow-hidden border border-[var(--warm-gray-400)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-[var(--digital-pollen)] bg-opacity-20 rounded-lg mb-6 group-hover:bg-opacity-30 transition-colors">
                <FileText className="h-8 w-8 text-[var(--black)] dark:text-[var(--digital-pollen)]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Invoice Management</h2>
              <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-6">
                Automatically classify and extract data from invoices, receipts,
                and purchase orders. Process entire collections with built-in
                validation.
              </p>
              <div className="flex items-center text-[var(--black)] dark:text-[var(--digital-pollen)] font-semibold">
                Explore Sample
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="bg-[var(--warm-gray-100)] dark:bg-[#0a0a0a] px-8 py-4 border-t border-[var(--warm-gray-400)]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
                  Features:
                </span>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white dark:bg-[#1a1414] rounded text-[var(--black)] dark:text-[var(--warm-gray-400)] text-xs font-medium border border-[var(--warm-gray-400)]">
                    Classification
                  </span>
                  <span className="px-2 py-1 bg-white dark:bg-[#1a1414] rounded text-[var(--black)] dark:text-[var(--warm-gray-400)] text-xs font-medium border border-[var(--warm-gray-400)]">
                    Extraction
                  </span>
                  <span className="px-2 py-1 bg-white dark:bg-[#1a1414] rounded text-[var(--black)] dark:text-[var(--warm-gray-400)] text-xs font-medium border border-[var(--warm-gray-400)]">
                    Validation
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Placeholder for future samples */}
          <div className="bg-white dark:bg-[#1a1414] rounded-2xl shadow-xl overflow-hidden border border-[var(--warm-gray-400)] opacity-50">
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-[var(--warm-gray-200)] rounded-lg mb-6">
                <FileText className="h-8 w-8 text-[var(--warm-gray-600)]" />
              </div>
              <h2 className="text-2xl font-bold mb-3">
                More Samples Coming Soon
              </h2>
              <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] mb-6">
                Additional AI Document Processing samples will be added to
                demonstrate more use cases and capabilities.
              </p>
              <div className="flex items-center text-[var(--warm-gray-600)] font-semibold">
                Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-sm text-[var(--warm-gray-600)]">
          <p>
            These samples are proof-of-concept demonstrations of the Nutrient AI
            Document Processing API capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
