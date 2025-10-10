"use client";

import { useEffect, useRef, useState } from "react";

interface DocumentAuthoringProps {
  document?: ArrayBuffer | string;
  onEditorReady?: (editor: any) => void;
  className?: string;
}

declare global {
  interface Window {
    DocAuth?: {
      createDocAuthSystem: () => Promise<{
        createEditor: (
          container: HTMLElement,
          options: {
            document: any;
          }
        ) => Promise<any>;
        createDocumentFromPlaintext: (text: string) => Promise<any>;
        createDocumentFromDocx: (docx: ArrayBuffer) => Promise<any>;
        importDOCX: (response: Response) => Promise<any>;
      }>;
    };
  }
}

export default function DocumentAuthoring({
  document,
  onEditorReady,
  className = "",
}: DocumentAuthoringProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const { DocAuth } = window;

    if (!container || !DocAuth) {
      return;
    }

    let mounted = true;

    (async () => {
      try {
        const docAuthSystem = await DocAuth.createDocAuthSystem();

        if (!mounted) return;

        // Create document based on input type
        let doc;
        if (document instanceof ArrayBuffer) {
          doc = await docAuthSystem.createDocumentFromDocx(document);
        } else if (typeof document === "string") {
          // Check if it's a URL (starts with / or http)
          if (document.startsWith('/') || document.startsWith('http')) {
            // Fetch and import DOCX file
            const response = await fetch(document);
            if (!response.ok) {
              throw new Error(`Failed to fetch document: ${response.statusText}`);
            }
            doc = await docAuthSystem.importDOCX(response);
          } else {
            // Treat as plaintext
            doc = await docAuthSystem.createDocumentFromPlaintext(document);
          }
        } else {
          // Default to empty document
          doc = await docAuthSystem.createDocumentFromPlaintext("");
        }

        if (!mounted) return;

        const editor = await docAuthSystem.createEditor(container, {
          document: doc,
        });

        if (!mounted) return;

        editorInstanceRef.current = editor;
        setIsLoading(false);

        if (onEditorReady) {
          onEditorReady(editor);
        }
      } catch (error) {
        console.error("Failed to initialize Document Authoring:", error);
        setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
      if (editorInstanceRef.current) {
        // Cleanup if needed - check DocAuth API for proper cleanup method
        editorInstanceRef.current = null;
      }
    };
  }, [document, onEditorReady]);

  return (
    <div className={`relative ${className || "w-full h-full"}`} style={{ minHeight: "400px" }}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-[#1a1414] z-10">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-[var(--warm-gray-400)] border-t-[var(--digital-pollen)] rounded-full animate-spin mb-4" />
            <p className="text-[var(--warm-gray-600)]">
              Initializing editor...
            </p>
          </div>
        </div>
      )}
      <div
        ref={containerRef}
        className="w-full h-full"
      />
    </div>
  );
}
