import { describe, it, expect } from "vitest";
import {
  cn,
  getCardWidthClass,
  getCardPadding,
  getCoverflowStyle,
  getRollingWindow,
  getImageUrl,
  getProjectFallbackEmoji,
} from "../utils";

describe("Utility Functions", () => {
  describe("cn", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
    });

    it("handles conditional classes", () => {
      expect(cn("base", "conditional")).toBe("base conditional");
      expect(cn("base")).toBe("base");
    });

    it("handles arrays and objects", () => {
      expect(cn(["class1", "class2"], { class3: true, class4: false })).toBe(
        "class1 class2 class3",
      );
    });

    it("should handle empty string", () => {
      expect(cn("")).toBe("");
    });

    it("should handle single class", () => {
      expect(cn("test-class")).toBe("test-class");
    });
  });

  describe("getImageUrl", () => {
    it("returns full URL for relative paths", () => {
      const result = getImageUrl("/image.jpg");
      expect(result).toContain("http://localhost");
      expect(result).toContain("/image.jpg");
    });

    it("returns full URL for absolute URLs", () => {
      const result = getImageUrl("https://example.com/image.jpg");
      expect(result).toBe("https://example.com/image.jpg");
    });

    it("returns fallback for empty URL", () => {
      const result = getImageUrl("", "fallback.jpg");
      expect(result).toBe("fallback.jpg");
    });

    it("returns empty string for empty URL without fallback", () => {
      const result = getImageUrl("");
      expect(result).toBe("");
    });
  });

  describe("getProjectFallbackEmoji", () => {
    it("returns food icon for recipe projects", () => {
      expect(getProjectFallbackEmoji("Recipe Finder App")).toBe("[FOOD]");
      expect(getProjectFallbackEmoji("Food Delivery App")).toBe("[FOOD]");
    });

    it("returns weather icon for weather projects", () => {
      expect(getProjectFallbackEmoji("Weather Dashboard")).toBe("[WEATHER]");
      expect(getProjectFallbackEmoji("Weather App")).toBe("[WEATHER]");
    });

    it("returns shopping icon for e-commerce projects", () => {
      expect(getProjectFallbackEmoji("E-Commerce Platform")).toBe("[SHOP]");
      expect(getProjectFallbackEmoji("Online Shop")).toBe("[SHOP]");
    });

    it("returns task icon for task management projects", () => {
      expect(getProjectFallbackEmoji("Task Management App")).toBe("[TASK]");
      expect(getProjectFallbackEmoji("Todo App")).toBe("[TASK]");
    });

    it("returns robot icon for AI projects", () => {
      expect(getProjectFallbackEmoji("AI Chat Assistant")).toBe("[AI]");
      expect(getProjectFallbackEmoji("Chatbot App")).toBe("[AI]");
    });

    it("returns chart icon for data projects", () => {
      expect(getProjectFallbackEmoji("Data Analytics Dashboard")).toBe("[DATA]");
      expect(getProjectFallbackEmoji("Analytics Platform")).toBe("[DATA]");
    });

    it("returns fitness icon for fitness projects", () => {
      expect(getProjectFallbackEmoji("Fitness Tracker")).toBe("[FITNESS]");
      expect(getProjectFallbackEmoji("Workout App")).toBe("[FITNESS]");
    });

    it("returns blog icon for blog projects", () => {
      expect(getProjectFallbackEmoji("Blog Platform")).toBe("[BLOG]");
    });

    it("returns portfolio icon for portfolio projects", () => {
      expect(getProjectFallbackEmoji("Portfolio Website")).toBe("[PORTFOLIO]");
    });

    it("returns default icon for unknown projects", () => {
      expect(getProjectFallbackEmoji("Random App")).toBe("[CODE]");
    });
  });

  describe("getCardWidthClass", () => {
    it("returns correct width for featured projects", () => {
      expect(getCardWidthClass(1, "featured")).toBe("w-full");
      expect(getCardWidthClass(2, "featured")).toBe("w-1/2");
      expect(getCardWidthClass(3, "featured")).toBe("w-1/2");
    });

    it("returns correct width for other projects", () => {
      expect(getCardWidthClass(1, "other")).toBe("w-full");
      expect(getCardWidthClass(2, "other")).toBe("w-1/2");
      expect(getCardWidthClass(3, "other")).toBe("w-1/3");
    });
  });

  describe("getCardPadding", () => {
    it("returns padding for non-last items", () => {
      expect(getCardPadding(0, 3)).toBe("px-4");
      expect(getCardPadding(1, 3)).toBe("px-4");
    });

    it("returns empty string for last item", () => {
      expect(getCardPadding(2, 3)).toBe("");
    });
  });

  describe("getCoverflowStyle", () => {
    it("returns center card style for current index", () => {
      const style = getCoverflowStyle(2, 2);
      expect(style.zIndex).toBe(10);
      expect(style.opacity).toBe(1);
    });

    it("returns left card style for previous index", () => {
      const style = getCoverflowStyle(1, 2);
      expect(style.zIndex).toBe(5);
      expect(style.opacity).toBeLessThan(1);
    });

    it("returns right card style for next index", () => {
      const style = getCoverflowStyle(3, 2);
      expect(style.zIndex).toBe(5);
      expect(style.opacity).toBeLessThan(1);
    });

    it("returns far card style for distant indices", () => {
      const style = getCoverflowStyle(0, 2);
      expect(style.zIndex).toBe(1);
      expect(style.opacity).toBeLessThan(1);
    });
  });

  describe("getRollingWindow", () => {
    it("returns correct window of items", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(getRollingWindow(arr, 0, 3)).toEqual([1, 2, 3]);
      expect(getRollingWindow(arr, 3, 3)).toEqual([4, 5, 1]);
    });

    it("handles empty array", () => {
      expect(getRollingWindow([], 0, 3)).toEqual([
        undefined,
        undefined,
        undefined,
      ]);
    });
  });

  describe("getCardWidthClass edge cases", () => {
    it("returns w-full for unexpected visible values", () => {
      expect(getCardWidthClass(0, "featured")).toBe("w-full");
      expect(getCardWidthClass(10, "other")).toBe("w-full");
    });
  });

  describe("getRollingWindow edge cases", () => {
    it("handles negative start index", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(getRollingWindow(arr, -1, 3)).toEqual([5, 1, 2]);
    });
    it("handles count greater than array length", () => {
      const arr = [1, 2];
      expect(getRollingWindow(arr, 0, 5)).toEqual([1, 2, 1, 2, 1]);
    });
  });

  describe("getImageUrl edge cases", () => {
    it("returns url as is for non-http, non-/ string", () => {
      expect(getImageUrl("foo.jpg")).toBe("foo.jpg");
    });
  });
});
