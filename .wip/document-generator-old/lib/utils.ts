import type { TemplateType, TemplateData } from "./types";

// Fetch template JSON from public folder
export const fetchTemplateJson = async (
  template: TemplateType,
): Promise<unknown> => {
  const response = await fetch(`/document-generator/templates/${template}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch template JSON for ${template}`);
  }
  return response.json();
};

// Fetch template data from public folder
export const fetchTemplateData = async (
  template: TemplateType,
): Promise<TemplateData> => {
  const response = await fetch(`/document-generator/data/${template}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch template data for ${template}`);
  }
  return response.json();
};

// Download PDF blob
export const downloadPdf = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// File validation
export const validateFile = (
  file: File,
): { valid: boolean; error?: string } => {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: "File size must be less than 10MB" };
  }

  if (
    file.type !==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    !file.name.endsWith(".docx")
  ) {
    return { valid: false, error: "Please select a valid DOCX file" };
  }

  return { valid: true };
};

// Read file as ArrayBuffer
export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as ArrayBuffer"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
};
