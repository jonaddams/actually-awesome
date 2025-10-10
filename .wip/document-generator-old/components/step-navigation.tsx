"use client";

import { useWizard } from "./wizard-context";

export default function StepNavigation() {
  const { state, dispatch } = useWizard();

  const isFirstStep = state.currentStep === 0;
  const isLastStep = state.currentStep === state.steps.length - 1;

  const handlePrevious = () => {
    if (!isFirstStep) {
      dispatch({ type: "SET_STEP", payload: state.currentStep - 1 });
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={isFirstStep}
          className={`
            px-6 py-2.5 rounded-lg font-medium transition-all
            ${
              isFirstStep
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            }
          `}
        >
          ← Previous
        </button>

        {/* Reset Button (shown on last step) */}
        {isLastStep && (
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2.5 rounded-lg font-medium bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all"
          >
            Start Over
          </button>
        )}

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={isLastStep}
          className={`
            px-6 py-2.5 rounded-lg font-medium transition-all
            ${
              isLastStep
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
            }
          `}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
