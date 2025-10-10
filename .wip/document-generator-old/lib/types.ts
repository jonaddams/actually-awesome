// Template Types
export type TemplateType = "invoice" | "checklist" | "menu" | "custom";

export interface TemplateOption {
  id: TemplateType;
  name: string;
  description: string;
  imagePath: string;
  category: string;
}

export interface TemplateData {
  model: Record<string, unknown>;
}

// Wizard Step Types
export interface WizardStep {
  id: number;
  title: string;
  description: string;
}

// Wizard State
export interface WizardState {
  currentStep: number;
  steps: WizardStep[];
  template: string;
  customTemplateBinary: ArrayBuffer | null;
  templateJson: unknown | null;
  dataJson: TemplateData | null;
  docxDocument: unknown | null; // DocAuth Document instance
  pdfDocument: ArrayBuffer | null;
  error: string | null;
  isLoading: boolean;
}

// Wizard Actions
export type WizardAction =
  | { type: "SET_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "COMPLETE_STEP"; payload: number }
  | { type: "SET_TEMPLATE"; payload: string }
  | { type: "SET_CUSTOM_TEMPLATE_BINARY"; payload: ArrayBuffer | null }
  | { type: "SET_TEMPLATE_JSON"; payload: unknown }
  | { type: "SET_DATA_JSON"; payload: TemplateData }
  | { type: "SET_DOCX_DOCUMENT"; payload: unknown }
  | { type: "SET_PDF_DOCUMENT"; payload: ArrayBuffer }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET_WIZARD" };

// Global SDK Types (available on window)
declare global {
  interface Window {
    NutrientDocumentAuthoring?: {
      loadDocument: (template: unknown) => Promise<unknown>;
      importDOCX: (buffer: ArrayBuffer) => Promise<unknown>;
    };
    NutrientViewer?: {
      load: (config: {
        container: HTMLElement | string;
        document: ArrayBuffer | string;
        licenseKey?: string;
        [key: string]: unknown;
      }) => Promise<unknown>;
      unload: (container: HTMLElement | unknown) => Promise<void>;
    };
  }
}

export {};
