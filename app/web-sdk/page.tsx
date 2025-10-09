"use client";

import Link from "next/link";
import { useState } from "react";

type Sample = {
  name: string;
  category: string;
  description: string;
  path: string;
};

const samples: Sample[] = [
  {
    name: "Custom Toolbar",
    category: "User Interface",
    description: "Demonstrates how to customize the viewer toolbar with custom buttons and controls",
    path: "/web-sdk/custom-toolbar",
  },
  {
    name: "Dark Mode Theme",
    category: "User Interface",
    description: "Shows how to implement and toggle between light and dark themes",
    path: "/web-sdk/dark-mode",
  },
  {
    name: "Highlight Annotations",
    category: "Annotations",
    description: "Add and manage text highlight annotations programmatically",
    path: "/web-sdk/highlight-annotations",
  },
  {
    name: "Sticky Note Comments",
    category: "Annotations",
    description: "Create and reply to sticky note annotations in PDFs",
    path: "/web-sdk/sticky-notes",
  },
  {
    name: "Ink Drawing",
    category: "Annotations",
    description: "Enable freehand drawing with ink annotations",
    path: "/web-sdk/ink-drawing",
  },
  {
    name: "Form Filling",
    category: "Forms",
    description: "Programmatically fill and validate PDF form fields",
    path: "/web-sdk/form-filling",
  },
  {
    name: "Form Designer",
    category: "Forms",
    description: "Create interactive PDF forms with various field types",
    path: "/web-sdk/form-designer",
  },
  {
    name: "Digital Signatures",
    category: "Signatures",
    description: "Add and verify digital signatures in PDF documents",
    path: "/web-sdk/digital-signatures",
  },
  {
    name: "Electronic Signatures",
    category: "Signatures",
    description: "Collect electronic signatures with a simple signature workflow",
    path: "/web-sdk/electronic-signatures",
  },
  {
    name: "Document Editor",
    category: "Document Editor",
    description: "Edit document content, add images, and modify text",
    path: "/web-sdk/document-editor",
  },
  {
    name: "Content Editor Advanced",
    category: "Content Editor",
    description: "Advanced content editing with formatting and styling options",
    path: "/web-sdk/content-editor-advanced",
  },
  {
    name: "Text Redaction",
    category: "Redaction",
    description: "Mark and apply redactions to sensitive information",
    path: "/web-sdk/text-redaction",
  },
  {
    name: "Document Generator",
    category: "Document Editor",
    description: "Create professional documents using templates, data, and the Document Authoring SDK",
    path: "/web-sdk/document-generator",
  },
];

const categories = [
  "All",
  "User Interface",
  "Annotations",
  "Forms",
  "Signatures",
  "Document Editor",
  "Content Editor",
  "Redaction",
];

export default function WebSDKPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSamples = selectedCategory === "All"
    ? samples
    : samples.filter(sample => sample.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1414]">
      {/* Header */}
      <header className="border-b border-[var(--warm-gray-400)] bg-white dark:bg-[#1a1414]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="text-sm opacity-60 hover:opacity-100 mb-2">
            ← Back to Home
          </Link>
          <h1 className="!mb-0">Web SDK Samples</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h2 className="!mb-6">Available Samples</h2>

          {/* Category Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${
                  selectedCategory === category
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Samples Table */}
          <div className="nutrient-table-container">
            <table className="nutrient-table">
              <thead>
                <tr>
                  <th className="nutrient-th nutrient-th-title">Name</th>
                  <th className="nutrient-th nutrient-th-title">Category</th>
                  <th className="nutrient-th nutrient-th-title">Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredSamples.map((sample) => (
                  <tr key={sample.path}>
                    <td className="nutrient-td nutrient-td-bold">
                      <Link
                        href={sample.path}
                        className="hover:opacity-70 transition-opacity"
                      >
                        {sample.name}
                      </Link>
                    </td>
                    <td className="nutrient-td">{sample.category}</td>
                    <td className="nutrient-td">{sample.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
