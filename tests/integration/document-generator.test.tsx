import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DocumentGeneratorPage from "@/app/web-sdk/document-generator/page";

describe("Document Generator Integration", () => {
  it("should render header with title and description", () => {
    render(<DocumentGeneratorPage />);

    expect(screen.getByText("Document Generator")).toBeInTheDocument();
    expect(
      screen.getByText("Create professional documents in just a few steps")
    ).toBeInTheDocument();
  });

  it("should render back link to Web SDK Samples", () => {
    render(<DocumentGeneratorPage />);

    const backLink = screen.getByText("← Back to Web SDK Samples");
    expect(backLink).toBeInTheDocument();
    expect(backLink.closest("a")).toHaveAttribute("href", "/web-sdk");
  });

  it("should show loading state initially", () => {
    render(<DocumentGeneratorPage />);

    expect(
      screen.getByText("Loading Document Authoring SDK...")
    ).toBeInTheDocument();
    expect(screen.getByText(/○ Document Authoring SDK/)).toBeInTheDocument();
    expect(screen.getByText(/○ NutrientViewer SDK/)).toBeInTheDocument();
  });

  it("should show loading spinner while SDKs are loading", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("should apply gradient background", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const mainContainer = container.querySelector(".bg-gradient-to-br");
    expect(mainContainer).toBeInTheDocument();
  });

  it("should render loading state with proper styling", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const loadingCard = container.querySelector(".rounded-xl.shadow-lg");
    expect(loadingCard).toBeInTheDocument();
    expect(loadingCard).toHaveClass("border", "border-gray-200");
  });

  it("should have header with dark background", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("bg-[#1a1a1a]", "text-white");
  });
});
