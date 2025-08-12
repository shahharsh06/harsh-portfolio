import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  MobileMenuContext,
  useMobileMenu,
  MobileMenuContextType,
} from "../MobileMenuContext.utils";
import React from "react";

describe("MobileMenuContext.utils", () => {
  describe("MobileMenuContext", () => {
    it("should export MobileMenuContext", () => {
      expect(MobileMenuContext).toBeDefined();
      expect(typeof MobileMenuContext).toBe("object");
    });

    it("should have correct context type", () => {
      expect(MobileMenuContext._currentValue).toBeUndefined();
    });
  });

  describe("useMobileMenu", () => {
    it("should export useMobileMenu function", () => {
      expect(typeof useMobileMenu).toBe("function");
    });

    it("should return context when used within provider", () => {
      const mockContext: MobileMenuContextType = {
        isMobileMenuOpen: false,
        setIsMobileMenuOpen: vi.fn(),
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MobileMenuContext.Provider value={mockContext}>
          {children}
        </MobileMenuContext.Provider>
      );

      const { result } = renderHook(() => useMobileMenu(), { wrapper });

      expect(result.current).toBe(mockContext);
      expect(result.current.isMobileMenuOpen).toBe(false);
      expect(typeof result.current.setIsMobileMenuOpen).toBe("function");
    });

    it("should return context with true isMobileMenuOpen", () => {
      const mockContext: MobileMenuContextType = {
        isMobileMenuOpen: true,
        setIsMobileMenuOpen: vi.fn(),
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MobileMenuContext.Provider value={mockContext}>
          {children}
        </MobileMenuContext.Provider>
      );

      const { result } = renderHook(() => useMobileMenu(), { wrapper });

      expect(result.current.isMobileMenuOpen).toBe(true);
    });

    it("should throw error when used outside provider", () => {
      expect(() => {
        renderHook(() => useMobileMenu());
      }).toThrow("useMobileMenu must be used within a MobileMenuProvider");
    });

    it("should call setIsMobileMenuOpen when provided", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      const mockContext: MobileMenuContextType = {
        isMobileMenuOpen: false,
        setIsMobileMenuOpen: mockSetIsMobileMenuOpen,
      };

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MobileMenuContext.Provider value={mockContext}>
          {children}
        </MobileMenuContext.Provider>
      );

      const { result } = renderHook(() => useMobileMenu(), { wrapper });

      result.current.setIsMobileMenuOpen(true);
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(true);

      result.current.setIsMobileMenuOpen(false);
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle context with undefined value", () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MobileMenuContext.Provider value={undefined as unknown}>
          {children}
        </MobileMenuContext.Provider>
      );

      expect(() => {
        renderHook(() => useMobileMenu(), { wrapper });
      }).toThrow("useMobileMenu must be used within a MobileMenuProvider");
    });
  });
});
