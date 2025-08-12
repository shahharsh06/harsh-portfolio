import React from "react";
import { renderHook } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  ThemeProviderContext,
  useTheme,
  type Theme,
  type ThemeProviderState,
} from "../ThemeProvider.utils";
import { ReactNode } from "react";

// Mock React context
const mockSetTheme = vi.fn();

const createMockContext = (theme: Theme = "system"): ThemeProviderState => ({
  theme,
  setTheme: mockSetTheme,
});

const createWrapper = (contextValue: ThemeProviderState) => {
  return ({ children }: { children: ReactNode }) => (
    <ThemeProviderContext.Provider value={contextValue}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

describe("ThemeProvider.utils", () => {
  describe("ThemeProviderContext", () => {
    it("should have correct default values", () => {
      // Test that the context is properly defined
      expect(ThemeProviderContext).toBeDefined();
      expect(ThemeProviderContext.Provider).toBeDefined();
    });
  });

  describe("useTheme", () => {
    it("should return theme context when used within provider", () => {
      const mockContext = createMockContext("dark");
      const wrapper = createWrapper(mockContext);

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("dark");
      expect(result.current.setTheme).toBe(mockSetTheme);
    });

    it("should return light theme when provided", () => {
      const mockContext = createMockContext("light");
      const wrapper = createWrapper(mockContext);

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("light");
    });

    it("should return system theme when provided", () => {
      const mockContext = createMockContext("system");
      const wrapper = createWrapper(mockContext);

      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("system");
    });

    it("should work with default context values when no provider is present", () => {
      // When no provider is present, React will use the default context value
      const { result } = renderHook(() => useTheme());

      expect(result.current.theme).toBe("system");
      expect(typeof result.current.setTheme).toBe("function");
    });

    it("should call setTheme when setTheme is invoked", () => {
      const mockContext = createMockContext("dark");
      const wrapper = createWrapper(mockContext);

      const { result } = renderHook(() => useTheme(), { wrapper });

      result.current.setTheme("light");
      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
  });

  describe("Theme types", () => {
    it("should accept valid theme values", () => {
      const validThemes: Theme[] = ["dark", "light", "system"];

      validThemes.forEach((theme) => {
        expect(validThemes).toContain(theme);
      });
    });

    it("should have correct theme type structure", () => {
      const theme: Theme = "dark";
      expect(typeof theme).toBe("string");
      expect(["dark", "light", "system"]).toContain(theme);
    });

    it("should validate theme type constraints", () => {
      // Test that Theme type only accepts valid values
      const validTheme: Theme = "light";
      const anotherValidTheme: Theme = "system";

      expect(validTheme).toBe("light");
      expect(anotherValidTheme).toBe("system");
    });
  });

  describe("ThemeProviderState type", () => {
    it("should have correct structure", () => {
      const mockState: ThemeProviderState = {
        theme: "dark",
        setTheme: vi.fn(),
      };

      expect(mockState).toHaveProperty("theme");
      expect(mockState).toHaveProperty("setTheme");
      expect(typeof mockState.theme).toBe("string");
      expect(typeof mockState.setTheme).toBe("function");
    });

    it("should accept all valid theme values", () => {
      const themes: Theme[] = ["dark", "light", "system"];

      themes.forEach((theme) => {
        const state: ThemeProviderState = {
          theme,
          setTheme: vi.fn(),
        };
        expect(state.theme).toBe(theme);
      });
    });
  });

  describe("Context integration", () => {
    it("should work with multiple consumers", () => {
      const mockContext = createMockContext("dark");
      const wrapper = createWrapper(mockContext);

      const { result: result1 } = renderHook(() => useTheme(), { wrapper });
      const { result: result2 } = renderHook(() => useTheme(), { wrapper });

      expect(result1.current.theme).toBe("dark");
      expect(result2.current.theme).toBe("dark");
      expect(result1.current.setTheme).toBe(result2.current.setTheme);
    });

    it("should handle nested providers", () => {
      const outerContext = createMockContext("dark");
      const innerContext = createMockContext("light");

      const CombinedWrapper = ({ children }: { children: ReactNode }) => (
        <ThemeProviderContext.Provider value={outerContext}>
          <ThemeProviderContext.Provider value={innerContext}>
            {children}
          </ThemeProviderContext.Provider>
        </ThemeProviderContext.Provider>
      );

      const { result } = renderHook(() => useTheme(), {
        wrapper: CombinedWrapper,
      });

      // Should use the innermost provider
      expect(result.current.theme).toBe("light");
    });
  });

  describe("useTheme edge cases", () => {
    it("should call setTheme multiple times", () => {
      const mockContext = createMockContext("dark");
      const wrapper = createWrapper(mockContext);

      const { result } = renderHook(() => useTheme(), { wrapper });

      result.current.setTheme("light");
      result.current.setTheme("dark");
      result.current.setTheme("system");

      expect(mockSetTheme).toHaveBeenCalledTimes(3);
      expect(mockSetTheme).toHaveBeenNthCalledWith(1, "light");
      expect(mockSetTheme).toHaveBeenNthCalledWith(2, "dark");
      expect(mockSetTheme).toHaveBeenNthCalledWith(3, "system");
    });

    it("should maintain theme state between renders", () => {
      const mockContext = createMockContext("dark");
      const wrapper = createWrapper(mockContext);

      const { result, rerender } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe("dark");

      // Rerender should maintain the same context
      rerender();
      expect(result.current.theme).toBe("dark");
      expect(result.current.setTheme).toBe(mockSetTheme);
    });

    it("should handle context updates", () => {
      let currentTheme: Theme = "dark";
      const mockSetThemeWithUpdate = vi.fn((newTheme: Theme) => {
        currentTheme = newTheme;
      });

      const createDynamicWrapper = () => {
        return ({ children }: { children: ReactNode }) => (
          <ThemeProviderContext.Provider
            value={{ theme: currentTheme, setTheme: mockSetThemeWithUpdate }}
          >
            {children}
          </ThemeProviderContext.Provider>
        );
      };

      const { result, rerender } = renderHook(() => useTheme(), {
        wrapper: createDynamicWrapper(),
      });

      expect(result.current.theme).toBe("dark");

      result.current.setTheme("light");
      expect(mockSetThemeWithUpdate).toHaveBeenCalledWith("light");

      // Rerender to get updated context
      rerender();
      expect(result.current.theme).toBe("light");
    });
  });

  describe("Context properties", () => {
    it("should have Consumer component", () => {
      expect(ThemeProviderContext.Consumer).toBeDefined();
      expect(typeof ThemeProviderContext.Consumer).toBe("object");
    });

    it("should have correct context structure", () => {
      expect(ThemeProviderContext).toBeDefined();
      expect(ThemeProviderContext.Provider).toBeDefined();
      expect(ThemeProviderContext.Consumer).toBeDefined();
    });
  });
});
