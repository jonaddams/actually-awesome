"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../wizard-context";
import { fetchTemplateData } from "../../lib/utils";

export default function DataStep() {
  const { state, dispatch } = useWizard();
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Load sample data when step is entered
  useEffect(() => {
    const loadSampleData = async () => {
      if (!state.template) return;

      // If we already have dataJson in state, use it
      if (state.dataJson) {
        setJsonText(JSON.stringify(state.dataJson, null, 2));
        return;
      }

      // Load sample data for pre-made templates
      if (state.template !== "custom") {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          const data = await fetchTemplateData(state.template);
          dispatch({ type: "SET_DATA_JSON", payload: data });
          setJsonText(JSON.stringify(data, null, 2));
        } catch (error) {
          dispatch({
            type: "SET_ERROR",
            payload:
              error instanceof Error ? error.message : "Failed to load sample data",
          });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        // For custom templates, provide empty object
        const emptyData = {};
        dispatch({ type: "SET_DATA_JSON", payload: emptyData });
        setJsonText(JSON.stringify(emptyData, null, 2));
      }
    };

    loadSampleData();
  }, [state.template, state.dataJson, dispatch]);

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    setJsonError(null);

    // Try to parse JSON to validate it
    try {
      const parsed = JSON.parse(value);
      dispatch({ type: "SET_DATA_JSON", payload: parsed });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      setJsonError(
        error instanceof Error ? error.message : "Invalid JSON format"
      );
    }
  };

  const handleResetData = async () => {
    if (!state.template) return;

    if (state.template !== "custom") {
      // Reload original sample data
      try {
        const data = await fetchTemplateData(state.template);
        dispatch({ type: "SET_DATA_JSON", payload: data });
        setJsonText(JSON.stringify(data, null, 2));
        setJsonError(null);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to reset data",
        });
      }
    } else {
      // Reset to empty object for custom templates
      const emptyData = {};
      dispatch({ type: "SET_DATA_JSON", payload: emptyData });
      setJsonText(JSON.stringify(emptyData, null, 2));
      setJsonError(null);
    }
  };

  const handleGenerateDocument = async () => {
    if (!state.templateJson || !state.dataJson) {
      dispatch({
        type: "SET_ERROR",
        payload: "Missing template or data",
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      if (!window.NutrientDocumentAuthoring) {
        throw new Error("Document Authoring SDK not loaded");
      }

      const docAuth = window.NutrientDocumentAuthoring;

      // Generate DOCX from template and data
      const docxBlob = await docAuth.generate({
        template: state.templateJson,
        data: state.dataJson,
      });

      // Convert Blob to ArrayBuffer for storage
      const arrayBuffer = await docxBlob.arrayBuffer();

      dispatch({ type: "SET_DOCX_DOCUMENT", payload: arrayBuffer });
      dispatch({ type: "SET_ERROR", payload: null });

      // Auto-advance to preview step
      dispatch({ type: "SET_STEP", payload: state.currentStep + 1 });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error instanceof Error
            ? error.message
            : "Failed to generate document",
      });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Provide Document Data</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Enter the data that will populate your document template
        </p>
      </div>

      {/* JSON Editor */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="data-json"
            className="font-semibold text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]"
          >
            Document Data (JSON)
          </label>
          <button
            type="button"
            onClick={handleResetData}
            className="btn-sm btn-gray"
          >
            Reset to Sample
          </button>
        </div>

        <textarea
          id="data-json"
          value={jsonText}
          onChange={(e) => handleJsonChange(e.target.value)}
          className={`
            w-full h-96 p-4 font-mono text-sm
            bg-[var(--warm-gray-100)] dark:bg-[#0a0a0a]
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[var(--digital-pollen)]
            ${jsonError ? "border-[var(--code-coral)]" : "border-[var(--warm-gray-400)]"}
          `}
          placeholder="Enter your document data as JSON..."
          spellCheck={false}
        />

        {/* JSON Error */}
        {jsonError && (
          <div className="mt-2 p-3 bg-[var(--code-coral)] bg-opacity-10 border border-[var(--code-coral)] rounded-lg">
            <p className="text-sm text-[var(--code-coral)] font-mono">
              {jsonError}
            </p>
          </div>
        )}

        {/* JSON Valid Indicator */}
        {!jsonError && jsonText && state.dataJson && (
          <div className="mt-2 flex items-center gap-2 text-sm text-[var(--data-green)]">
            <span>✓</span>
            <span>Valid JSON</span>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-[var(--warm-gray-100)] dark:bg-[#1a1414] p-4 rounded-lg border border-[var(--warm-gray-400)]">
        <h3 className="font-semibold text-sm mb-2">Data Format Guide</h3>
        <ul className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] space-y-1 list-disc list-inside">
          <li>Match the structure expected by your template placeholders</li>
          <li>Use nested objects for complex data structures</li>
          <li>Arrays can be used for repeating sections like line items</li>
          <li>All values will be inserted into the template automatically</li>
        </ul>
      </div>

      {/* Generate Button */}
      {state.dataJson && !jsonError && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={handleGenerateDocument}
            disabled={state.isLoading}
            className="btn btn-yellow px-8"
          >
            {state.isLoading ? "Generating..." : "Generate Document"}
          </button>
        </div>
      )}
    </div>
  );
}
