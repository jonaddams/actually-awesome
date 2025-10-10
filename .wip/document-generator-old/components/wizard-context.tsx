"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { WizardState } from "../lib/types";

interface WizardContextType {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}

type WizardAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_TEMPLATE"; payload: string }
  | { type: "SET_CUSTOM_TEMPLATE"; payload: ArrayBuffer }
  | { type: "SET_TEMPLATE_JSON"; payload: unknown }
  | { type: "SET_DATA_JSON"; payload: unknown }
  | { type: "SET_DOCX_DOCUMENT"; payload: unknown }
  | { type: "SET_PDF_DOCUMENT"; payload: ArrayBuffer }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET" };

const initialState: WizardState = {
  currentStep: 0,
  steps: [
    { id: 0, title: "Template", description: "Choose or upload a template" },
    { id: 1, title: "Customize", description: "Edit template structure" },
    { id: 2, title: "Data", description: "Provide document data" },
    { id: 3, title: "Preview", description: "Review DOCX output" },
    { id: 4, title: "Download", description: "Get your PDF" },
  ],
  template: "",
  customTemplateBinary: null,
  templateJson: null,
  dataJson: null,
  docxDocument: null,
  pdfDocument: null,
  error: null,
  isLoading: false,
};

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload, error: null };
    case "SET_TEMPLATE":
      return { ...state, template: action.payload, customTemplateBinary: null };
    case "SET_CUSTOM_TEMPLATE":
      return { ...state, customTemplateBinary: action.payload, template: "custom" };
    case "SET_TEMPLATE_JSON":
      return { ...state, templateJson: action.payload };
    case "SET_DATA_JSON":
      return { ...state, dataJson: action.payload };
    case "SET_DOCX_DOCUMENT":
      return { ...state, docxDocument: action.payload };
    case "SET_PDF_DOCUMENT":
      return { ...state, pdfDocument: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
