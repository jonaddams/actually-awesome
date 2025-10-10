import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import React from "react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: any) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock Next.js Script component
vi.mock("next/script", () => ({
  default: ({ src, onLoad, children }: any) => {
    // Simulate script loading
    if (onLoad) {
      setTimeout(onLoad, 0);
    }
    return children || null;
  },
}));

// Mock Nutrient SDK (loaded via CDN)
global.NutrientViewer = {
  load: vi.fn().mockResolvedValue({
    instance: {
      setViewState: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    },
  }),
} as any;

// Mock window.matchMedia for dark mode tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
