import type { TemplateOption } from "./types";

// Template options for selection
export const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: "invoice",
    name: "Invoice Template",
    description: "Professional invoice template for businesses",
    imagePath: "/document-generator/assets/invoice.png",
    category: "Business",
  },
  {
    id: "checklist",
    name: "Checklist Template",
    description: "Organized checklist for tasks and projects",
    imagePath: "/document-generator/assets/checklist.png",
    category: "Productivity",
  },
  {
    id: "menu",
    name: "Menu Template",
    description: "Restaurant menu template with elegant design",
    imagePath: "/document-generator/assets/menu.png",
    category: "Food & Beverage",
  },
];

// Step titles and descriptions
export const STEP_CONFIG = [
  {
    id: "template",
    title: "Choose Template",
    description: "Select a document template",
  },
  {
    id: "customize",
    title: "Customize Template",
    description: "Edit template structure",
  },
  {
    id: "data",
    title: "Add Data",
    description: "Provide document data",
  },
  {
    id: "preview",
    title: "Preview Document",
    description: "Review your document",
  },
  {
    id: "download",
    title: "Download",
    description: "Get your document",
  },
];
