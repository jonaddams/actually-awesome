import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Button Components", () => {
  it("should render primary button with correct styles", () => {
    render(<button className="btn btn-primary">Click Me</button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-primary");
  });

  it("should render secondary button with correct styles", () => {
    render(<button className="btn btn-secondary">Secondary</button>);
    const button = screen.getByText("Secondary");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-secondary");
  });

  it("should render yellow button (SDK page style)", () => {
    render(<button className="btn btn-yellow">Try For Free</button>);
    const button = screen.getByText("Try For Free");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-yellow");
  });

  it("should render yellow outline button", () => {
    render(
      <button className="btn btn-yellow-outline">Contact Sales</button>,
    );
    const button = screen.getByText("Contact Sales");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-yellow-outline");
  });

  it("should render small button variant", () => {
    render(<button className="btn btn-sm btn-secondary">Small</button>);
    const button = screen.getByText("Small");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn", "btn-sm", "btn-secondary");
  });

  it("should render button as link", () => {
    render(
      <a href="/test" className="btn btn-primary">
        Link Button
      </a>,
    );
    const link = screen.getByText("Link Button");
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("btn", "btn-primary");
    expect(link).toHaveAttribute("href", "/test");
  });
});
