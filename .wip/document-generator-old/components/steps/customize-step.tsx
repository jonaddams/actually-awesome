"use client";

import { useEffect, useState } from "react";
import { useWizard } from "../wizard-context";
import { fetchTemplateJson } from "../../lib/utils";

export default function CustomizeStep() {
  const { state, dispatch } = useWizard();
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Load template JSON when step is entered
  useEffect(() => {
    const loadTemplateJson = async () => {
      if (!state.template) return;

      // If we already have templateJson in state, use it
      if (state.templateJson) {
        setJsonText(JSON.stringify(state.templateJson, null, 2));
        return;
      }

      // Load from file for pre-made templates
      if (state.template !== "custom") {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          const json = await fetchTemplateJson(state.template);
          dispatch({ type: "SET_TEMPLATE_JSON", payload: json });
          setJsonText(JSON.stringify(json, null, 2));
        } catch (error) {
          dispatch({
            type: "SET_ERROR",
            payload:
              error instanceof Error ? error.message : "Failed to load template",
          });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else if (state.customTemplateBinary) {
        // For custom templates, we'll extract JSON using Document Authoring SDK
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          if (!window.NutrientDocumentAuthoring) {
            throw new Error("Document Authoring SDK not loaded");
          }

          const docAuth = window.NutrientDocumentAuthoring;
          const json = await docAuth.getTemplateFromDocx(
            state.customTemplateBinary
          );

          dispatch({ type: "SET_TEMPLATE_JSON", payload: json });
          setJsonText(JSON.stringify(json, null, 2));
        } catch (error) {
          dispatch({
            type: "SET_ERROR",
            payload:
              error instanceof Error
                ? error.message
                : "Failed to extract template JSON from custom file",
          });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    };

    loadTemplateJson();
  }, [state.template, state.customTemplateBinary, state.templateJson, dispatch]);

  const handleJsonChange = (value: string) => {
    setJsonText(value);
    setJsonError(null);

    // Try to parse JSON to validate it
    try {
      const parsed = JSON.parse(value);
      dispatch({ type: "SET_TEMPLATE_JSON", payload: parsed });
      dispatch({ type: "SET_ERROR", payload: null });
    } catch (error) {
      setJsonError(
        error instanceof Error ? error.message : "Invalid JSON format"
      );
    }
  };

  const handleResetJson = async () => {
    if (!state.template) return;

    if (state.template !== "custom") {
      // Reload original template
      try {
        const json = await fetchTemplateJson(state.template);
        dispatch({ type: "SET_TEMPLATE_JSON", payload: json });
        setJsonText(JSON.stringify(json, null, 2));
        setJsonError(null);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to reset template",
        });
      }
    } else if (state.customTemplateBinary) {
      // Re-extract from custom file
      try {
        if (!window.NutrientDocumentAuthoring) {
          throw new Error("Document Authoring SDK not loaded");
        }

        const docAuth = window.NutrientDocumentAuthoring;
        const json = await docAuth.getTemplateFromDocx(
          state.customTemplateBinary
        );

        dispatch({ type: "SET_TEMPLATE_JSON", payload: json });
        setJsonText(JSON.stringify(json, null, 2));
        setJsonError(null);
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload:
            error instanceof Error ? error.message : "Failed to reset template",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Customize Template Structure</h2>
        <p className="text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]">
          Edit the template JSON to customize placeholders and document structure
        </p>
      </div>

      {/* JSON Editor */}
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="template-json"
            className="font-semibold text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)]"
          >
            Template JSON
          </label>
          <button
            type="button"
            onClick={handleResetJson}
            className="btn-sm btn-gray"
          >
            Reset to Original
          </button>
        </div>

        <textarea
          id="template-json"
          value={jsonText}
          onChange={(e) => handleJsonChange(e.target.value)}
          className={`
            w-full h-96 p-4 font-mono text-sm
            bg-[var(--warm-gray-100)] dark:bg-[#0a0a0a]
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[var(--digital-pollen)]
            ${jsonError ? "border-[var(--code-coral)]" : "border-[var(--warm-gray-400)]"}
          `}
          placeholder="Template JSON will appear here..."
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
        {!jsonError && jsonText && state.templateJson && (
          <div className="mt-2 flex items-center gap-2 text-sm text-[var(--data-green)]">
            <span>✓</span>
            <span>Valid JSON</span>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="bg-[var(--warm-gray-100)] dark:bg-[#1a1414] p-4 rounded-lg border border-[var(--warm-gray-400)]">
        <h3 className="font-semibold text-sm mb-2">About Template JSON</h3>
        <ul className="text-sm text-[var(--warm-gray-800)] dark:text-[var(--warm-gray-400)] space-y-1 list-disc list-inside">
          <li>Define placeholders using curly braces syntax: {`{{placeholder}}`}</li>
          <li>Use dot notation for nested data: {`{{user.name}}`}</li>
          <li>Supports conditional sections and loops</li>
          <li>Changes will be applied to the final document</li>
        </ul>
      </div>

      {/* Next Step Hint */}
      {state.templateJson && !jsonError && (
        <div className="text-center pt-4">
          <p className="text-sm text-[var(--warm-gray-600)]">
            Click <strong>Next</strong> to provide document data
          </p>
        </div>
      )}
    </div>
  );
}
