import { describe, it, expect, vi } from "vitest";
import { scrollToSection } from "../Navigation.utils";

describe("Navigation.utils", () => {
  describe("scrollToSection", () => {
    it("should export scrollToSection function", () => {
      expect(typeof scrollToSection).toBe("function");
    });

    it("should call scrollToSection with correct parameters", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      const mockElement = { scrollIntoView: vi.fn() };
      vi.spyOn(document, "querySelector").mockReturnValue(
        mockElement as unknown as Element,
      );

      scrollToSection("#test", mockSetIsMobileMenuOpen);

      expect(document.querySelector).toHaveBeenCalledWith("#test");
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
      });
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle null element gracefully", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      vi.spyOn(document, "querySelector").mockReturnValue(null);

      expect(() =>
        scrollToSection("#nonexistent", mockSetIsMobileMenuOpen),
      ).not.toThrow();
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle empty href gracefully", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      vi.spyOn(document, "querySelector").mockReturnValue(null);

      expect(() => scrollToSection("", mockSetIsMobileMenuOpen)).not.toThrow();
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle undefined href gracefully", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      vi.spyOn(document, "querySelector").mockReturnValue(null);

      expect(() =>
        scrollToSection(undefined as string, mockSetIsMobileMenuOpen),
      ).not.toThrow();
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle different href formats", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      const mockElement = { scrollIntoView: vi.fn() };
      vi.spyOn(document, "querySelector").mockReturnValue(
        mockElement as unknown as Element,
      );

      const testCases = ["#home", "#about", "#contact", "#projects"];

      testCases.forEach((href) => {
        scrollToSection(href, mockSetIsMobileMenuOpen);
        expect(document.querySelector).toHaveBeenCalledWith(href);
      });
    });

    it("should always close mobile menu regardless of element existence", () => {
      const mockSetIsMobileMenuOpen = vi.fn();

      // Test with existing element
      const mockElement = { scrollIntoView: vi.fn() };
      vi.spyOn(document, "querySelector").mockReturnValue(
        mockElement as unknown as Element,
      );
      scrollToSection("#test", mockSetIsMobileMenuOpen);
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);

      // Reset mock
      mockSetIsMobileMenuOpen.mockClear();

      // Test with non-existing element
      vi.spyOn(document, "querySelector").mockReturnValue(null);
      scrollToSection("#nonexistent", mockSetIsMobileMenuOpen);
      expect(mockSetIsMobileMenuOpen).toHaveBeenCalledWith(false);
    });

    it("should handle element without scrollIntoView method", () => {
      const mockSetIsMobileMenuOpen = vi.fn();
      const mockElement = {}; // Element without scrollIntoView
      vi.spyOn(document, "querySelector").mockReturnValue(
        mockElement as unknown as Element,
      );

      expect(() => scrollToSection("#test", mockSetIsMobileMenuOpen)).toThrow(
        "element?.scrollIntoView is not a function",
      );
      // Note: setIsMobileMenuOpen is not called when an error is thrown
    });
  });
});
