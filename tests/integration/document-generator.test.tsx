import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
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

  it("should render step indicator with all 5 steps", () => {
    render(<DocumentGeneratorPage />);

    expect(screen.getByText("Choose Template")).toBeInTheDocument();
    expect(screen.getByText("Customize")).toBeInTheDocument();
    expect(screen.getByText("Add Data")).toBeInTheDocument();
    expect(screen.getByText("Preview")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("should show step 1 content by default", () => {
    render(<DocumentGeneratorPage />);

    expect(screen.getByText("Choose a Template")).toBeInTheDocument();
    expect(
      screen.getByText("Select one of our pre-made templates or upload your own DOCX file")
    ).toBeInTheDocument();
  });

  it("should render template cards", () => {
    render(<DocumentGeneratorPage />);

    expect(screen.getByText("Invoice Template")).toBeInTheDocument();
    expect(screen.getByText("Checklist Template")).toBeInTheDocument();
    expect(screen.getByText("Menu Template")).toBeInTheDocument();
  });

  it("should render navigation buttons", () => {
    render(<DocumentGeneratorPage />);

    expect(screen.getByText("← Previous")).toBeInTheDocument();
    expect(screen.getByText("Next →")).toBeInTheDocument();
  });

  it("should navigate to next step when Next button is clicked", async () => {
    const user = userEvent.setup();
    render(<DocumentGeneratorPage />);

    const nextButton = screen.getByText("Next →");
    await user.click(nextButton);

    expect(screen.getByText("Customize Your Template")).toBeInTheDocument();
  });

  it("should disable Previous button on first step", () => {
    render(<DocumentGeneratorPage />);

    const previousButton = screen.getByText("← Previous");
    expect(previousButton).toBeDisabled();
  });

  it("should have light gray background", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const mainContainer = container.querySelector(".bg-\\[var\\(--warm-gray-100\\)\\]");
    expect(mainContainer).toBeInTheDocument();
  });

  it("should have white header with border", () => {
    const { container } = render(<DocumentGeneratorPage />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("bg-white", "border-b");
  });
});
