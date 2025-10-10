"use client";

import Link from "next/link";
import { useState } from "react";

type Step = {
  number: number;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: 1,
    title: "Choose Template",
    description: "Select a document template to get started",
  },
  {
    number: 2,
    title: "Customize",
    description: "Edit template structure and layout",
  },
  {
    number: 3,
    title: "Add Data",
    description: "Provide the data to populate your document",
  },
  {
    number: 4,
    title: "Preview",
    description: "Review and make final adjustments",
  },
  {
    number: 5,
    title: "Download",
    description: "Get your finished PDF document",
  },
];

export default function DocumentGeneratorNew() {
  const [currentStep, setCurrentStep] = useState(1);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--warm-gray-100)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--warm-gray-400)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/web-sdk"
            className="text-sm text-[var(--warm-gray-800)] hover:text-[var(--black)] mb-3 inline-block"
          >
            ← Back to Web SDK Samples
          </Link>
          <h1 className="!mb-2">Document Generator</h1>
          <p className="text-[var(--warm-gray-800)]">
            Create professional documents in just a few steps
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-[var(--warm-gray-400)] overflow-hidden">
          {/* Step Indicator */}
          <div className="px-8 py-8 bg-[var(--warm-gray-100)] border-b border-[var(--warm-gray-400)]">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    {/* Step Circle */}
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-3
                        transition-all duration-200
                        ${
                          currentStep === step.number
                            ? "bg-[var(--digital-pollen)] text-[var(--black)] ring-4 ring-[var(--digital-pollen)] ring-opacity-20"
                            : currentStep > step.number
                              ? "bg-[var(--data-green)] text-white"
                              : "bg-white border-2 border-[var(--warm-gray-400)] text-[var(--warm-gray-800)]"
                        }
                      `}
                    >
                      {currentStep > step.number ? (
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        step.number
                      )}
                    </div>

                    {/* Step Title */}
                    <div className="text-center max-w-[140px]">
                      <p
                        className={`
                          text-sm font-semibold mb-1
                          ${
                            currentStep === step.number
                              ? "text-[var(--black)]"
                              : "text-[var(--warm-gray-800)]"
                          }
                        `}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-[var(--warm-gray-800)] hidden lg:block">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4 mb-12">
                      <div
                        className={`
                          w-full h-full transition-all duration-200
                          ${
                            currentStep > step.number
                              ? "bg-[var(--data-green)]"
                              : "bg-[var(--warm-gray-400)]"
                          }
                        `}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="px-8 py-12 min-h-[600px]">
            {/* Step 1: Choose Template */}
            {currentStep === 1 && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">Choose a Template</h2>
                  <p className="text-[var(--warm-gray-800)] text-lg">
                    Select one of our pre-made templates or upload your own DOCX file
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {["Invoice Template", "Checklist Template", "Menu Template"].map(
                    (template, i) => (
                      <button
                        key={template}
                        type="button"
                        className="group relative bg-white border-2 border-[var(--warm-gray-400)] rounded-lg overflow-hidden hover:border-[var(--digital-pollen)] hover:shadow-lg transition-all duration-200"
                      >
                        <div className="aspect-[3/4] bg-[var(--warm-gray-100)] flex items-center justify-center">
                          <div className="text-6xl">📄</div>
                        </div>
                        <div className="p-4 text-left">
                          <h3 className="font-semibold mb-1">{template}</h3>
                          <p className="text-sm text-[var(--warm-gray-800)]">
                            Professional template for businesses
                          </p>
                        </div>
                      </button>
                    )
                  )}
                </div>

                <div className="text-center pt-8 border-t border-[var(--warm-gray-400)]">
                  <p className="text-[var(--warm-gray-800)] mb-4">
                    Or upload your own DOCX template
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                  >
                    Upload Custom Template
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Customize */}
            {currentStep === 2 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">Customize Your Template</h2>
                  <p className="text-[var(--warm-gray-800)] text-lg">
                    Edit the template structure and placeholders
                  </p>
                </div>

                <div className="bg-[var(--warm-gray-100)] rounded-lg p-6 border border-[var(--warm-gray-400)]">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-semibold text-sm">Template JSON</label>
                    <button type="button" className="btn btn-sm btn-secondary">
                      Reset to Original
                    </button>
                  </div>
                  <textarea
                    className="w-full h-96 p-4 font-mono text-sm bg-white border-2 border-[var(--warm-gray-400)] rounded-lg focus:outline-none focus:border-[var(--digital-pollen)] focus:ring-2 focus:ring-[var(--digital-pollen)] focus:ring-opacity-20"
                    placeholder='{\n  "template": "...",\n  "placeholders": [...]\n}'
                    spellCheck={false}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Add Data */}
            {currentStep === 3 && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">Provide Document Data</h2>
                  <p className="text-[var(--warm-gray-800)] text-lg">
                    Enter the data that will populate your template
                  </p>
                </div>

                <div className="bg-[var(--warm-gray-100)] rounded-lg p-6 border border-[var(--warm-gray-400)] mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="font-semibold text-sm">Document Data (JSON)</label>
                    <button type="button" className="btn btn-sm btn-secondary">
                      Load Sample Data
                    </button>
                  </div>
                  <textarea
                    className="w-full h-96 p-4 font-mono text-sm bg-white border-2 border-[var(--warm-gray-400)] rounded-lg focus:outline-none focus:border-[var(--digital-pollen)] focus:ring-2 focus:ring-[var(--digital-pollen)] focus:ring-opacity-20"
                    placeholder='{\n  "name": "...",\n  "date": "...",\n  ...\n}'
                    spellCheck={false}
                  />
                </div>

                <div className="text-center">
                  <button type="button" className="btn btn-yellow px-8">
                    Generate Document
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Preview */}
            {currentStep === 4 && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">Preview Your Document</h2>
                  <p className="text-[var(--warm-gray-800)] text-lg">
                    Review your generated DOCX document
                  </p>
                </div>

                <div className="bg-[var(--data-green)] bg-opacity-10 border-2 border-[var(--data-green)] rounded-lg p-8 mb-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--data-green)]">
                    Document Generated Successfully!
                  </h3>
                  <p className="text-[var(--warm-gray-800)]">
                    Your DOCX document is ready to download or convert to PDF
                  </p>
                </div>

                <div className="flex gap-4 justify-center">
                  <button type="button" className="btn btn-secondary px-6">
                    Download DOCX
                  </button>
                  <button type="button" className="btn btn-yellow px-6">
                    Convert to PDF →
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Download */}
            {currentStep === 5 && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-3">Your PDF is Ready!</h2>
                  <p className="text-[var(--warm-gray-800)] text-lg">
                    Preview and download your final document
                  </p>
                </div>

                <div className="bg-[var(--data-green)] bg-opacity-10 border-2 border-[var(--data-green)] rounded-lg p-6 mb-8 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <div className="text-3xl">✓</div>
                    <div>
                      <h3 className="font-bold text-lg text-[var(--data-green)]">
                        PDF Generated Successfully
                      </h3>
                      <p className="text-sm text-[var(--warm-gray-800)]">
                        Your document is ready to download and share
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <button type="button" className="btn btn-yellow px-12 py-3 text-lg">
                    Download PDF
                  </button>
                </div>

                <div className="bg-[var(--warm-gray-100)] rounded-lg border-2 border-[var(--warm-gray-400)] overflow-hidden">
                  <div className="aspect-[8.5/11] flex items-center justify-center text-[var(--warm-gray-800)]">
                    PDF Viewer (placeholder)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="px-8 py-6 bg-[var(--warm-gray-100)] border-t border-[var(--warm-gray-400)]">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <button
                type="button"
                onClick={() => goToStep(currentStep - 1)}
                disabled={currentStep === 1}
                className={`btn ${currentStep === 1 ? "btn-secondary opacity-40 cursor-not-allowed" : "btn-secondary"}`}
              >
                ← Previous
              </button>

              {currentStep === 5 ? (
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="btn btn-secondary"
                >
                  Start Over
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => goToStep(currentStep + 1)}
                  className="btn btn-yellow"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
