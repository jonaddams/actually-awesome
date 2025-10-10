"use client";

import Image from "next/image";
import { useWizard } from "../wizard-context";
import { TEMPLATE_OPTIONS } from "../../lib/constants";
import { validateFile, readFileAsArrayBuffer } from "../../lib/utils";
import type { TemplateType } from "../../lib/types";

export default function TemplateStep() {
  const { state, dispatch } = useWizard();

  const handleTemplateSelect = (templateId: TemplateType) => {
    dispatch({ type: "SET_TEMPLATE", payload: templateId });
    dispatch({ type: "SET_ERROR", payload: null });
  };

  const handleCustomUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        dispatch({ type: "SET_ERROR", payload: validation.error || "Invalid file" });
        return;
      }

      // Read file as ArrayBuffer
      const arrayBuffer = await readFileAsArrayBuffer(file);
      dispatch({ type: "SET_CUSTOM_TEMPLATE", payload: arrayBuffer });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error instanceof Error ? error.message : "Failed to upload file",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose a Template</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Select one of our pre-made templates or upload your own DOCX file
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
        {TEMPLATE_OPTIONS.map((template, index) => {
          const isSelected = state.template === template.id;

          return (
            <button
              key={template.id}
              type="button"
              onClick={() => handleTemplateSelect(template.id as TemplateType)}
              className={`
                group relative overflow-hidden rounded-xl border-2 transition-all
                hover:shadow-lg hover:scale-105 flex flex-col w-full
                ${
                  isSelected
                    ? "border-[var(--digital-pollen)] shadow-lg"
                    : "border-[var(--warm-gray-400)] hover:border-[var(--warm-gray-600)]"
                }
              `}
            >
              {/* Image */}
              <div className="relative h-48 w-full bg-[var(--warm-gray-100)] overflow-hidden flex items-center justify-center">
                <Image
                  src={template.imagePath}
                  alt={template.name}
                  width={400}
                  height={400}
                  className="object-contain max-h-full w-auto"
                  unoptimized
                />
                {isSelected && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-[var(--digital-pollen)] rounded-full flex items-center justify-center">
                    <span className="text-[var(--black)] font-bold">✓</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 bg-white dark:bg-[#1a1414] text-left">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-[var(--warm-gray-200)] text-[var(--warm-gray-800)]">
                    {template.category}
                  </span>
                </div>
                <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
                  {template.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Upload Section */}
      <div className="mt-8 pt-8 border-t border-[var(--warm-gray-400)]">
        <div className="max-w-xl mx-auto">
          <h3 className="font-semibold text-lg mb-3 text-center">
            Or Upload Your Own Template
          </h3>
          <p className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] text-center mb-4">
            Upload a DOCX file with placeholders for dynamic content
          </p>

          <label
            htmlFor="custom-upload"
            className={`
              block w-full p-6 border-2 border-dashed rounded-xl text-center cursor-pointer
              transition-all hover:border-[var(--digital-pollen)] hover:bg-[var(--warm-gray-100)]
              ${
                state.template === "custom"
                  ? "border-[var(--digital-pollen)] bg-[var(--warm-gray-100)]"
                  : "border-[var(--warm-gray-400)]"
              }
            `}
          >
            <input
              id="custom-upload"
              type="file"
              accept=".docx"
              onChange={handleCustomUpload}
              className="hidden"
            />
            {state.template === "custom" && state.customTemplateBinary ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-[var(--data-green)] text-2xl">✓</span>
                <span className="font-semibold">Custom template uploaded</span>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">📄</div>
                <p className="font-semibold mb-1">Click to upload DOCX file</p>
                <p className="text-sm text-[var(--warm-gray-600)]">
                  Maximum file size: 10MB
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Next Step Hint */}
      {(state.template && state.template !== "custom") ||
      (state.template === "custom" && state.customTemplateBinary) ? (
        <div className="text-center pt-4">
          <p className="text-sm text-[var(--warm-gray-600)]">
            Click <strong>Next</strong> to continue to customization
          </p>
        </div>
      ) : null}
    </div>
  );
}
