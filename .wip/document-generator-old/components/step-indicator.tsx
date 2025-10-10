"use client";

import { useWizard } from "./wizard-context";

export default function StepIndicator() {
  const { state } = useWizard();

  return (
    <div className="px-8 py-8 border-b border-gray-200 bg-gray-50">
      <div className="flex items-start justify-between max-w-5xl mx-auto">
        {state.steps.map((step, index) => {
          const isActive = state.currentStep === index;
          const isCompleted = state.currentStep > index;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle and Content */}
              <div className="flex flex-col items-center text-center flex-1">
                {/* Number */}
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {index + 1}
                </div>

                {/* Step Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    font-semibold transition-all mb-3
                    ${
                      isCompleted
                        ? "bg-blue-500 text-white shadow-md"
                        : isActive
                          ? "bg-blue-600 text-white shadow-lg ring-4 ring-blue-100"
                          : "bg-white text-gray-400 border-2 border-gray-300"
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                    </svg>
                  )}
                </div>

                {/* Step Title */}
                <div className="max-w-[120px]">
                  <p
                    className={`
                      text-sm font-semibold mb-1
                      ${isActive ? "text-gray-900" : "text-gray-600"}
                    `}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden lg:block">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < state.steps.length - 1 && (
                <div className="flex-1 flex items-center px-4 pb-16">
                  <div
                    className={`
                      w-full h-0.5 transition-colors
                      ${isCompleted ? "bg-blue-500" : "bg-gray-300"}
                    `}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
