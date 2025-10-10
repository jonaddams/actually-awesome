"use client";

import { useWizard } from "./wizard-context";
import TemplateStep from "./steps/template-step";
import CustomizeStep from "./steps/customize-step";
import DataStep from "./steps/data-step";
import PreviewStep from "./steps/preview-step";
import DownloadStep from "./steps/download-step";

export default function StepContent() {
  const { state } = useWizard();

  // Actual step components
  const steps = [
    <TemplateStep key="template" />,
    <CustomizeStep key="customize" />,
    <DataStep key="data" />,
    <PreviewStep key="preview" />,
    <DownloadStep key="download" />,
  ];

  return (
    <div className="px-8 py-10 min-h-[600px] bg-white">
      {state.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-semibold">{state.error}</p>
        </div>
      )}

      {state.isLoading ? (
        <div className="flex items-center justify-center h-[500px]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            <p className="mt-4 text-gray-700 font-medium">
              Processing...
            </p>
          </div>
        </div>
      ) : (
        steps[state.currentStep]
      )}
    </div>
  );
}
