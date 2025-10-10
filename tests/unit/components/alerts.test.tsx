import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Alert Components", () => {
  it("should render neutral alert", () => {
    render(
      <div className="nutrient-alert nutrient-alert-neutral">
        <div className="nutrient-alert-icon">ℹ</div>
        <div className="nutrient-alert-content">
          This is a neutral informational alert
        </div>
      </div>,
    );

    expect(
      screen.getByText("This is a neutral informational alert"),
    ).toBeInTheDocument();
    expect(screen.getByText("ℹ")).toBeInTheDocument();
  });

  it("should render success alert", () => {
    render(
      <div className="nutrient-alert nutrient-alert-success">
        <div className="nutrient-alert-icon">✓</div>
        <div className="nutrient-alert-content">This is a success alert</div>
      </div>,
    );

    expect(screen.getByText("This is a success alert")).toBeInTheDocument();
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("should render warning alert", () => {
    render(
      <div className="nutrient-alert nutrient-alert-warning">
        <div className="nutrient-alert-icon">⚠</div>
        <div className="nutrient-alert-content">This is a warning alert</div>
      </div>,
    );

    expect(screen.getByText("This is a warning alert")).toBeInTheDocument();
    expect(screen.getByText("⚠")).toBeInTheDocument();
  });

  it("should render error alert", () => {
    render(
      <div className="nutrient-alert nutrient-alert-error">
        <div className="nutrient-alert-icon">✕</div>
        <div className="nutrient-alert-content">This is an error alert</div>
      </div>,
    );

    expect(screen.getByText("This is an error alert")).toBeInTheDocument();
    expect(screen.getByText("✕")).toBeInTheDocument();
  });

  it("should have correct structure with icon and content", () => {
    render(
      <div className="nutrient-alert nutrient-alert-neutral">
        <div className="nutrient-alert-icon">ℹ</div>
        <div className="nutrient-alert-content">Test message</div>
      </div>,
    );

    const alert = screen.getByText("Test message").parentElement;
    expect(alert).toHaveClass("nutrient-alert", "nutrient-alert-neutral");

    const icon = screen.getByText("ℹ");
    expect(icon).toHaveClass("nutrient-alert-icon");

    const content = screen.getByText("Test message");
    expect(content).toHaveClass("nutrient-alert-content");
  });
});
