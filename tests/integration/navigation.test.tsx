import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("Navigation Integration", () => {
  it("should render homepage with all product cards", () => {
    render(<HomePage />);

    // Check header
    expect(screen.getByText("Nutrient SDK Samples")).toBeInTheDocument();

    // Check all SDK cards are present
    expect(screen.getByText("Web SDK")).toBeInTheDocument();
    expect(screen.getByText("Document Engine")).toBeInTheDocument();
    expect(screen.getByText(".NET SDK")).toBeInTheDocument();
    expect(screen.getByText("AI Document Processing")).toBeInTheDocument();
    expect(screen.getByText("Nutrient API")).toBeInTheDocument();
    expect(screen.getByText("Workflow")).toBeInTheDocument();
  });

  it("should have links to all product pages", () => {
    render(<HomePage />);

    // Check for "View Samples" buttons/links
    const viewSamplesLinks = screen.getAllByText("View Samples");
    expect(viewSamplesLinks.length).toBeGreaterThan(0);
  });

  it("should have documentation links for each product", () => {
    render(<HomePage />);

    // Check for "Documentation" links
    const docLinks = screen.getAllByText("Documentation");
    expect(docLinks.length).toBeGreaterThan(0);
  });

  it("should display introduction text", () => {
    render(<HomePage />);

    expect(
      screen.getByText(/Explore interactive demos and code samples/i),
    ).toBeInTheDocument();
  });
});
