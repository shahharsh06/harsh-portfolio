import { describe, it, expect, vi } from "vitest";
import {
  scrollTo,
  handleHover,
  scrollToFeatured,
  scrollToOther,
  scrollToFeaturedMobile,
  scrollToOtherMobile,
  handleFeaturedHover,
  handleOtherHover,
  createFeaturedHoverConfig,
  createOtherHoverConfig,
} from "../Projects.utils";

describe("Projects.utils", () => {
  describe("scrollTo", () => {
    it("calls prev handler when direction is prev", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollTo("prev", mockHandlers);

      expect(mockHandlers.prev).toHaveBeenCalledTimes(1);
      expect(mockHandlers.next).not.toHaveBeenCalled();
    });

    it("calls next handler when direction is next", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollTo("next", mockHandlers);

      expect(mockHandlers.next).toHaveBeenCalledTimes(1);
      expect(mockHandlers.prev).not.toHaveBeenCalled();
    });
  });

  describe("handleHover", () => {
    it("pauses carousel when hovering", () => {
      const mockConfig = {
        setHovered: vi.fn(),
        pause: vi.fn(),
        pauseMobile: vi.fn(),
        resume: vi.fn(),
        resumeMobile: vi.fn(),
      };

      handleHover(true, mockConfig);

      expect(mockConfig.setHovered).toHaveBeenCalledWith(true);
      expect(mockConfig.pause).toHaveBeenCalledTimes(1);
      expect(mockConfig.pauseMobile).toHaveBeenCalledTimes(1);
      expect(mockConfig.resume).not.toHaveBeenCalled();
      expect(mockConfig.resumeMobile).not.toHaveBeenCalled();
    });

    it("resumes carousel when not hovering", () => {
      const mockConfig = {
        setHovered: vi.fn(),
        pause: vi.fn(),
        pauseMobile: vi.fn(),
        resume: vi.fn(),
        resumeMobile: vi.fn(),
      };

      handleHover(false, mockConfig);

      expect(mockConfig.setHovered).toHaveBeenCalledWith(false);
      expect(mockConfig.resume).toHaveBeenCalledTimes(1);
      expect(mockConfig.resumeMobile).toHaveBeenCalledTimes(1);
      expect(mockConfig.pause).not.toHaveBeenCalled();
      expect(mockConfig.pauseMobile).not.toHaveBeenCalled();
    });
  });

  describe("scrollToFeatured", () => {
    it("delegates to scrollTo function", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollToFeatured("prev", mockHandlers);

      expect(mockHandlers.prev).toHaveBeenCalledTimes(1);
    });
  });

  describe("scrollToOther", () => {
    it("delegates to scrollTo function", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollToOther("next", mockHandlers);

      expect(mockHandlers.next).toHaveBeenCalledTimes(1);
    });
  });

  describe("scrollToFeaturedMobile", () => {
    it("delegates to scrollTo function", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollToFeaturedMobile("prev", mockHandlers);

      expect(mockHandlers.prev).toHaveBeenCalledTimes(1);
    });
  });

  describe("scrollToOtherMobile", () => {
    it("delegates to scrollTo function", () => {
      const mockHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      scrollToOtherMobile("next", mockHandlers);

      expect(mockHandlers.next).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleFeaturedHover", () => {
    it("delegates to handleHover function", () => {
      const mockConfig = {
        setHovered: vi.fn(),
        pause: vi.fn(),
        pauseMobile: vi.fn(),
        resume: vi.fn(),
        resumeMobile: vi.fn(),
      };

      handleFeaturedHover(true, mockConfig);

      expect(mockConfig.setHovered).toHaveBeenCalledWith(true);
      expect(mockConfig.pause).toHaveBeenCalledTimes(1);
      expect(mockConfig.pauseMobile).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleOtherHover", () => {
    it("delegates to handleHover function", () => {
      const mockConfig = {
        setHovered: vi.fn(),
        pause: vi.fn(),
        pauseMobile: vi.fn(),
        resume: vi.fn(),
        resumeMobile: vi.fn(),
      };

      handleOtherHover(false, mockConfig);

      expect(mockConfig.setHovered).toHaveBeenCalledWith(false);
      expect(mockConfig.resume).toHaveBeenCalledTimes(1);
      expect(mockConfig.resumeMobile).toHaveBeenCalledTimes(1);
    });
  });

  describe("createFeaturedHoverConfig", () => {
    it("creates config object with correct properties", () => {
      const mockSetIsFeaturedHovered = vi.fn();
      const mockPauseFeatured = vi.fn();
      const mockPauseFeaturedMobile = vi.fn();
      const mockResumeFeatured = vi.fn();
      const mockResumeFeaturedMobile = vi.fn();

      const config = createFeaturedHoverConfig(
        mockSetIsFeaturedHovered,
        mockPauseFeatured,
        mockPauseFeaturedMobile,
        mockResumeFeatured,
        mockResumeFeaturedMobile,
      );

      expect(config.setHovered).toBe(mockSetIsFeaturedHovered);
      expect(config.pause).toBe(mockPauseFeatured);
      expect(config.pauseMobile).toBe(mockPauseFeaturedMobile);
      expect(config.resume).toBe(mockResumeFeatured);
      expect(config.resumeMobile).toBe(mockResumeFeaturedMobile);
    });
  });

  describe("createOtherHoverConfig", () => {
    it("creates config object with correct properties", () => {
      const mockSetIsOtherHovered = vi.fn();
      const mockPauseOther = vi.fn();
      const mockPauseOtherMobile = vi.fn();
      const mockResumeOther = vi.fn();
      const mockResumeOtherMobile = vi.fn();

      const config = createOtherHoverConfig(
        mockSetIsOtherHovered,
        mockPauseOther,
        mockPauseOtherMobile,
        mockResumeOther,
        mockResumeOtherMobile,
      );

      expect(config.setHovered).toBe(mockSetIsOtherHovered);
      expect(config.pause).toBe(mockPauseOther);
      expect(config.pauseMobile).toBe(mockPauseOtherMobile);
      expect(config.resume).toBe(mockResumeOther);
      expect(config.resumeMobile).toBe(mockResumeOtherMobile);
    });
  });

  describe("edge cases", () => {
    it("handles empty handlers gracefully", () => {
      const emptyHandlers = {
        prev: vi.fn(),
        next: vi.fn(),
      };

      expect(() => scrollTo("prev", emptyHandlers)).not.toThrow();
      expect(() => scrollTo("next", emptyHandlers)).not.toThrow();
    });

    it("handles null config gracefully", () => {
      const nullConfig = {
        setHovered: vi.fn(),
        pause: vi.fn(),
        pauseMobile: vi.fn(),
        resume: vi.fn(),
        resumeMobile: vi.fn(),
      };

      expect(() => handleHover(true, nullConfig)).not.toThrow();
      expect(() => handleHover(false, nullConfig)).not.toThrow();
    });

    it("handles config with no-op functions", () => {
      const noOpConfig = {
        setHovered: () => {},
        pause: () => {},
        pauseMobile: () => {},
        resume: () => {},
        resumeMobile: () => {},
      };

      expect(() => handleHover(true, noOpConfig)).not.toThrow();
      expect(() => handleHover(false, noOpConfig)).not.toThrow();
    });
  });
});
