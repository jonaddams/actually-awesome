import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Tag Components", () => {
  it("should render basic tag", () => {
    render(<span className="nutrient-tag">JavaScript</span>);
    const tag = screen.getByText("JavaScript");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass("nutrient-tag");
  });

  it("should render multiple tags", () => {
    render(
      <div>
        <span className="nutrient-tag">TypeScript</span>
        <span className="nutrient-tag">React</span>
        <span className="nutrient-tag">Next.js</span>
      </div>,
    );

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });

  it("should have rounded pill shape styling", () => {
    render(<span className="nutrient-tag">Pill</span>);
    const tag = screen.getByText("Pill");
    expect(tag).toHaveClass("nutrient-tag");
  });
});
