import { ArrowRight, CheckCircle, FileText, Zap } from "lucide-react";
import Link from "next/link";

export default function InvoicesHome() {
	return (
		<div className="min-h-screen bg-white dark:bg-[#1a1414]">
			{/* Header */}
			<header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<Link
						href="/ai-document-processing"
						className="text-sm opacity-60 hover:opacity-100 mb-2 block"
					>
						← Back to AI Document Processing
					</Link>
					<h1 className="!mb-0">Invoice Management</h1>
					<p className="text-sm opacity-60 mt-2">
						AI-powered invoice classification and data extraction
					</p>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Introduction */}
				<div className="mb-12">
					<p className="opacity-80 mb-8 max-w-4xl">
						Experience AI-powered document classification and data extraction
						for invoices. Process your invoice collection and watch as our
						advanced technology automatically extracts and validates key
						information.
					</p>

					{/* Feature Cards */}
					<div className="grid md:grid-cols-3 gap-6">
						<div className="p-6 border border-[var(--warm-gray-400)] rounded-lg">
							<FileText className="w-12 h-12 mb-4 opacity-70" />
							<h3 className="!mb-3">Smart Invoice Recognition</h3>
							<p className="text-sm opacity-70">
								Automatically identifies and classifies invoices, receipts,
								purchase orders, and utility bills.
							</p>
						</div>

						<div className="p-6 border border-[var(--warm-gray-400)] rounded-lg">
							<Zap className="w-12 h-12 mb-4 opacity-70" />
							<h3 className="!mb-3">Instant Data Extraction</h3>
							<p className="text-sm opacity-70">
								Extracts key information like vendor details, amounts, dates,
								and line items in seconds.
							</p>
						</div>

						<div className="p-6 border border-[var(--warm-gray-400)] rounded-lg">
							<CheckCircle className="w-12 h-12 mb-4 opacity-70" />
							<h3 className="!mb-3">Built-in Validation</h3>
							<p className="text-sm opacity-70">
								Validates extracted data for accuracy and completeness, ensuring
								reliable invoice processing.
							</p>
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="mb-12">
					<Link href="/ai-document-processing/invoices/preview" className="btn btn-yellow no-underline !text-[var(--black)]">
						Preview Invoice Collection
						<ArrowRight className="ml-2 w-4 h-4 inline-block" />
					</Link>
				</div>

				{/* Footer Note */}
				<div className="text-sm opacity-60">
					<p>
						This is a proof-of-concept demonstration of the Nutrient AI Document
						Processing API capabilities.
					</p>
				</div>
			</main>
		</div>
	);
}
