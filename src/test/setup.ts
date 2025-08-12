import "@testing-library/jest-dom";
import { vi } from "vitest";

// Make vi available globally for TypeScript
declare global {
  const vi: (typeof import("vitest"))["vi"];
}

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Mock smooth scrolling
Object.defineProperty(window, "scrollIntoView", {
  writable: true,
  value: vi.fn(),
});

// Mock document.querySelector to prevent hanging
const originalQuerySelector = document.querySelector;
document.querySelector = vi.fn((selector: string) => {
  // Return a mock element for navigation tests
  if (selector.startsWith("#")) {
    return {
      scrollIntoView: vi.fn(),
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: 100,
        height: 100,
      }),
    } as unknown as HTMLElement;
  }
  return originalQuerySelector.call(document, selector);
});

// Suppress React Router warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0]?.includes?.("React Router Future Flag Warning")) {
    return;
  }
  originalWarn(...args);
};

// Setup global test utilities
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: vi.fn(),
  // debug: vi.fn(),
  // info: vi.fn(),
  // warn: vi.fn(),
  // error: vi.fn(),
};

// Mock disposable-email-domains package
vi.mock("disposable-email-domains", () => ({
  default: [
    "10minutemail.com",
    "tempmail.org",
    "guerrillamail.com",
    "mailinator.com",
    "yopmail.com",
    "temp-mail.org",
    "sharklasers.com",
    "getairmail.com",
    "mailnesia.com",
    "trashmail.com",
  ],
}));

// Ensure proper cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
  vi.clearAllTimers();
});
