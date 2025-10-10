import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import WebSDKPage from "@/app/web-sdk/page";

describe("Web SDK Samples Page Filtering", () => {
  it("should render all samples when 'All' category is selected", () => {
    render(<WebSDKPage />);

    // All category is selected by default
    expect(screen.getByRole("link", { name: "Custom Toolbar" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dark Mode Theme" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Highlight Annotations" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Form Filling" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Digital Signatures" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Document Editor" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Text Redaction" })).toBeInTheDocument();
  });

  it("should filter samples by User Interface category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const userInterfaceButton = screen.getByRole("button", {
      name: "User Interface",
    });
    await user.click(userInterfaceButton);

    // Should show User Interface samples
    expect(screen.getByText("Custom Toolbar")).toBeInTheDocument();
    expect(screen.getByText("Dark Mode Theme")).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByText("Highlight Annotations")).not.toBeInTheDocument();
    expect(screen.queryByText("Form Filling")).not.toBeInTheDocument();
  });

  it("should filter samples by Annotations category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const annotationsButton = screen.getByRole("button", {
      name: "Annotations",
    });
    await user.click(annotationsButton);

    // Should show Annotations samples
    expect(screen.getByText("Highlight Annotations")).toBeInTheDocument();
    expect(screen.getByText("Sticky Note Comments")).toBeInTheDocument();
    expect(screen.getByText("Ink Drawing")).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByText("Custom Toolbar")).not.toBeInTheDocument();
    expect(screen.queryByText("Form Filling")).not.toBeInTheDocument();
  });

  it("should filter samples by Forms category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const formsButton = screen.getByRole("button", { name: "Forms" });
    await user.click(formsButton);

    // Should show Forms samples
    expect(screen.getByText("Form Filling")).toBeInTheDocument();
    expect(screen.getByText("Form Designer")).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByText("Custom Toolbar")).not.toBeInTheDocument();
    expect(screen.queryByText("Highlight Annotations")).not.toBeInTheDocument();
  });

  it("should filter samples by Signatures category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const signaturesButton = screen.getByRole("button", {
      name: "Signatures",
    });
    await user.click(signaturesButton);

    // Should show Signatures samples
    expect(screen.getByText("Digital Signatures")).toBeInTheDocument();
    expect(screen.getByText("Electronic Signatures")).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByText("Form Filling")).not.toBeInTheDocument();
  });

  it("should filter samples by Document Editor category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const documentEditorButton = screen.getByRole("button", {
      name: "Document Editor",
    });
    await user.click(documentEditorButton);

    // Should show Document Editor samples (using roles to avoid button confusion)
    expect(screen.getByRole("link", { name: "Document Editor" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Document Generator" })).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByRole("link", { name: "Highlight Annotations" })).not.toBeInTheDocument();
  });

  it("should filter samples by Content Editor category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const contentEditorButton = screen.getByRole("button", {
      name: "Content Editor",
    });
    await user.click(contentEditorButton);

    // Should show Content Editor samples
    expect(screen.getByRole("link", { name: "Content Editor Advanced" })).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByRole("link", { name: "Document Editor" })).not.toBeInTheDocument();
  });

  it("should filter samples by Redaction category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const redactionButton = screen.getByRole("button", { name: "Redaction" });
    await user.click(redactionButton);

    // Should show Redaction samples
    expect(screen.getByRole("link", { name: "Text Redaction" })).toBeInTheDocument();

    // Should not show samples from other categories
    expect(screen.queryByRole("link", { name: "Document Editor" })).not.toBeInTheDocument();
  });

  it("should show all samples again when switching back to All category", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    // Filter to Forms
    const formsButton = screen.getByRole("button", { name: "Forms" });
    await user.click(formsButton);

    // Verify filtering works
    expect(screen.queryByText("Custom Toolbar")).not.toBeInTheDocument();

    // Switch back to All
    const allButton = screen.getByRole("button", { name: "All" });
    await user.click(allButton);

    // Should show all samples again
    expect(screen.getByText("Custom Toolbar")).toBeInTheDocument();
    expect(screen.getByText("Form Filling")).toBeInTheDocument();
    expect(screen.getByText("Digital Signatures")).toBeInTheDocument();
  });

  it("should apply active styling to selected category button", async () => {
    const user = userEvent.setup();
    render(<WebSDKPage />);

    const allButton = screen.getByRole("button", { name: "All" });
    const formsButton = screen.getByRole("button", { name: "Forms" });

    // All button should be active by default
    expect(allButton).toHaveClass("btn-primary");
    expect(formsButton).toHaveClass("btn-secondary");

    // Click Forms button
    await user.click(formsButton);

    // Forms button should now be active
    expect(formsButton).toHaveClass("btn-primary");
    expect(allButton).toHaveClass("btn-secondary");
  });

  it("should render table with correct headers", () => {
    render(<WebSDKPage />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("should render Product Home and Guides links", () => {
    render(<WebSDKPage />);

    const productHomeLink = screen.getByText("Product Home");
    const guidesLink = screen.getByText("Guides");

    expect(productHomeLink).toBeInTheDocument();
    expect(productHomeLink.closest("a")).toHaveAttribute(
      "href",
      "https://www.nutrient.io/sdk/web/"
    );
    expect(guidesLink).toBeInTheDocument();
    expect(guidesLink.closest("a")).toHaveAttribute(
      "href",
      "https://www.nutrient.io/guides/web/"
    );
  });

  it("should have correct links for each sample", () => {
    render(<WebSDKPage />);

    const customToolbarLink = screen.getByText("Custom Toolbar");
    expect(customToolbarLink.closest("a")).toHaveAttribute(
      "href",
      "/web-sdk/custom-toolbar"
    );

    const formFillingLink = screen.getByText("Form Filling");
    expect(formFillingLink.closest("a")).toHaveAttribute(
      "href",
      "/web-sdk/form-filling"
    );

    const documentGeneratorLink = screen.getByText("Document Generator");
    expect(documentGeneratorLink.closest("a")).toHaveAttribute(
      "href",
      "/web-sdk/document-generator"
    );
  });
});
