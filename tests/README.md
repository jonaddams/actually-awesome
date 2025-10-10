# Testing Documentation

This project uses a comprehensive testing strategy to ensure reliability and catch breaking changes from SDK updates or code modifications.

## Testing Stack

- **Vitest** - Fast unit and integration test runner
- **React Testing Library** - Component testing utilities
- **Happy DOM** - Lightweight DOM implementation for tests
- **@testing-library/jest-dom** - Custom matchers for DOM testing

## Test Structure

```
tests/
├── unit/                      # Unit tests for individual components
│   └── components/           # Design system component tests
│       ├── buttons.test.tsx
│       ├── badges.test.tsx
│       ├── tags.test.tsx
│       └── alerts.test.tsx
├── integration/              # Integration tests
│   └── navigation.test.tsx   # Page navigation tests
├── e2e/                      # End-to-end tests (future)
├── fixtures/                 # Test data and mock files
└── setup.ts                  # Test environment setup
```

## Running Tests

### Basic Commands

```bash
# Run all tests once
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with UI (interactive browser interface)
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

### Test Patterns

```bash
# Run specific test file
pnpm test buttons.test.tsx

# Run tests matching a pattern
pnpm test --grep "Button"

# Run tests in a specific directory
pnpm test tests/unit
```

## Writing Tests

### Unit Test Example

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("MyComponent", () => {
  it("should render correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });
});
```

### Integration Test Example

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";

describe("Page Integration", () => {
  it("should render all sections", () => {
    render(<Page />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
```

## Mocked Dependencies

The following are automatically mocked in `tests/setup.ts`:

- **Next.js Router** - `useRouter`, `usePathname`, `useSearchParams`
- **Next.js Link** - Renders as regular `<a>` tag
- **Next.js Script** - Simulates script loading
- **Nutrient SDK** - Mock SDK implementation
- **window.matchMedia** - For dark mode tests

## Test Coverage

Current test coverage focuses on:

✅ **Design System Components**
- Buttons (all variants)
- Badges (all color variants)
- Tags
- Alerts (all types)

✅ **Page Navigation**
- Homepage renders all product cards
- Links are present and functional

### Coverage Reports

After running `pnpm test:coverage`, open `coverage/index.html` in your browser to see detailed coverage reports.

## Best Practices

### 1. Test User Behavior, Not Implementation

❌ Bad:
```tsx
expect(component.state.isOpen).toBe(true);
```

✅ Good:
```tsx
expect(screen.getByText("Menu")).toBeVisible();
```

### 2. Use Semantic Queries

Prefer queries in this order:
1. `getByRole` - Best for accessibility
2. `getByLabelText` - For form elements
3. `getByText` - For non-interactive content
4. `getByTestId` - Last resort only

### 3. Test Accessibility

```tsx
// Check button is accessible
const button = screen.getByRole("button", { name: "Submit" });
expect(button).toBeEnabled();
```

### 4. Keep Tests Focused

Each test should verify one specific behavior.

## Future Enhancements

### Phase 2: More Integration Tests (Planned)
- SDK loading and initialization
- Document generator wizard flow
- Filter functionality on samples page

### Phase 3: E2E Tests (Planned)
- Playwright for full browser testing
- Critical user flows
- Visual regression tests

### Phase 4: CI/CD Integration (Planned)
- GitHub Actions workflow
- Automated testing on PRs
- Preview deployment testing

## Troubleshooting

### Tests failing after SDK update

1. Check if SDK API changed
2. Update mocks in `tests/setup.ts`
3. Update tests to match new behavior

### Import errors

Make sure `@/` path alias is configured in:
- `tsconfig.json`
- `vitest.config.ts`

### Component not rendering

Check if component needs:
- Client component directive (`"use client"`)
- Mocked Next.js dependencies
- CSS imports (handled automatically)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
