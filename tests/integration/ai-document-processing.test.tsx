import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AIDocumentProcessingPage from "@/app/ai-document-processing/page";
import InvoicesPage from "@/app/ai-document-processing/invoices/page";

describe("AI Document Processing Integration", () => {
  describe("Main Page", () => {
    it("should render the AI Document Processing page with header", () => {
      render(<AIDocumentProcessingPage />);
      expect(
        screen.getByText("Nutrient AI Document Processing")
      ).toBeInTheDocument();
      expect(screen.getByText("Formerly known as XtractFlow")).toBeInTheDocument();
    });

    it("should render Product Home and Guides links", () => {
      render(<AIDocumentProcessingPage />);
      const productHomeLink = screen.getByText("Product Home");
      const guidesLink = screen.getByText("Guides");

      expect(productHomeLink).toBeInTheDocument();
      expect(productHomeLink.closest("a")).toHaveAttribute(
        "href",
        "https://www.nutrient.io/sdk/ai-document-processing/"
      );
      expect(guidesLink).toBeInTheDocument();
      expect(guidesLink.closest("a")).toHaveAttribute(
        "href",
        "https://www.nutrient.io/guides/ai-document-processing/"
      );
    });

    it("should render About section with description", () => {
      render(<AIDocumentProcessingPage />);
      expect(screen.getByText("About")).toBeInTheDocument();
      expect(
        screen.getByText(/powerful APIs for automating document-centric workflows/i)
      ).toBeInTheDocument();
    });

    it("should render feature cards for Classification, Extraction, and Validation", () => {
      render(<AIDocumentProcessingPage />);
      expect(screen.getByText("Classification")).toBeInTheDocument();
      expect(screen.getByText("Extraction")).toBeInTheDocument();
      expect(screen.getByText("Validation")).toBeInTheDocument();

      expect(
        screen.getByText(/Automatically identify document types/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Extract structured data from unstructured documents/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Built-in validation ensures extracted data/i)
      ).toBeInTheDocument();
    });

    it("should render Available Samples table", () => {
      render(<AIDocumentProcessingPage />);
      expect(screen.getByText("Available Samples")).toBeInTheDocument();

      // Check table headers
      expect(screen.getByText("Name")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();

      // Check Invoice Management sample
      expect(screen.getByText("Invoice Management")).toBeInTheDocument();
      expect(
        screen.getByText(/Automatically classify and extract data from invoices/i)
      ).toBeInTheDocument();
    });

    it("should have link to Invoice Management sample", () => {
      render(<AIDocumentProcessingPage />);
      const invoiceLink = screen.getByText("Invoice Management");
      expect(invoiceLink.closest("a")).toHaveAttribute(
        "href",
        "/ai-document-processing/invoices"
      );
    });

    it("should render footer note", () => {
      render(<AIDocumentProcessingPage />);
      expect(
        screen.getByText(/proof-of-concept demonstrations/i)
      ).toBeInTheDocument();
    });
  });

  describe("Invoice Management Page", () => {
    it("should render Invoice Management page with header", () => {
      render(<InvoicesPage />);
      expect(screen.getByText("Invoice Management")).toBeInTheDocument();
      expect(
        screen.getByText("AI-powered invoice classification and data extraction")
      ).toBeInTheDocument();
    });

    it("should render back link to AI Document Processing", () => {
      render(<InvoicesPage />);
      const backLink = screen.getByText("← Back to AI Document Processing");
      expect(backLink).toBeInTheDocument();
      expect(backLink.closest("a")).toHaveAttribute(
        "href",
        "/ai-document-processing"
      );
    });

    it("should render introduction text", () => {
      render(<InvoicesPage />);
      expect(
        screen.getByText(/Experience AI-powered document classification/i)
      ).toBeInTheDocument();
    });

    it("should render feature cards", () => {
      render(<InvoicesPage />);
      expect(screen.getByText("Smart Invoice Recognition")).toBeInTheDocument();
      expect(screen.getByText("Instant Data Extraction")).toBeInTheDocument();
      expect(screen.getByText("Built-in Validation")).toBeInTheDocument();
    });

    it("should render CTA button with link to preview", () => {
      render(<InvoicesPage />);
      const ctaButton = screen.getByText("Preview Invoice Collection");
      expect(ctaButton).toBeInTheDocument();
      expect(ctaButton.closest("a")).toHaveAttribute(
        "href",
        "/ai-document-processing/invoices/preview"
      );
    });

    it("should render footer note", () => {
      render(<InvoicesPage />);
      expect(
        screen.getByText(/proof-of-concept demonstration/i)
      ).toBeInTheDocument();
    });
  });
});
