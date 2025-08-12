import { vi } from "vitest";

// Test data
export const mockPersonalInfo = {
  name: "Test User",
  email: "test@example.com",
  location: "Test Location",
  title: "Test Title",
  github: "testuser",
  linkedin: "testuser",
};

export const mockSocialLinks = {
  github: "https://github.com/testuser",
  linkedin: "https://www.linkedin.com/in/testuser/",
  email: "mailto:test@example.com",
};

// Mock constants
export const mockConstants = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280,
  },
  PERSONAL_INFO: mockPersonalInfo,
  SOCIAL_LINKS: mockSocialLinks,
};

// Test helpers
export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

export const createMockResizeObserver = () => {
  const mockResizeObserver = vi.fn();
  mockResizeObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.ResizeObserver = mockResizeObserver;
  return mockResizeObserver;
};

// Wait for animations to complete
export const waitForAnimation = () =>
  new Promise((resolve) => setTimeout(resolve, 100));

// Mock window methods
export const mockWindowMethods = () => {
  Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
  });
  Object.defineProperty(window, "scrollIntoView", {
    writable: true,
    value: vi.fn(),
  });
};

// Helper to wrap state updates in act()
export const act = async (callback: () => void | Promise<void>) => {
  const { act: reactAct } = await import("@testing-library/react");
  return reactAct(callback);
};
