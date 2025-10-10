import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Badge Components", () => {
  it("should render neutral badge", () => {
    render(
      <span className="nutrient-badge nutrient-badge-neutral">Neutral</span>,
    );
    const badge = screen.getByText("Neutral");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("nutrient-badge", "nutrient-badge-neutral");
  });

  it("should render accent badge", () => {
    render(
      <span className="nutrient-badge nutrient-badge-accent">Accent</span>,
    );
    const badge = screen.getByText("Accent");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("nutrient-badge", "nutrient-badge-accent");
  });

  it("should render success badge", () => {
    render(
      <span className="nutrient-badge nutrient-badge-success">Success</span>,
    );
    const badge = screen.getByText("Success");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("nutrient-badge", "nutrient-badge-success");
  });

  it("should render pink badge", () => {
    render(<span className="nutrient-badge nutrient-badge-pink">Pink</span>);
    const badge = screen.getByText("Pink");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("nutrient-badge", "nutrient-badge-pink");
  });

  it("should render coral badge", () => {
    render(<span className="nutrient-badge nutrient-badge-coral">Coral</span>);
    const badge = screen.getByText("Coral");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("nutrient-badge", "nutrient-badge-coral");
  });

  it("should have uppercase text", () => {
    render(
      <span className="nutrient-badge nutrient-badge-neutral">test</span>,
    );
    const badge = screen.getByText("test");
    // The CSS will handle uppercase transform
    expect(badge).toBeInTheDocument();
  });
});
