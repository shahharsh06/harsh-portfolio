import { describe, it, expect } from "vitest";
import { navItems, socialLinks } from "../Navigation.constants";

describe("Navigation.constants", () => {
  describe("navItems", () => {
    it("should export navItems array with correct structure", () => {
      expect(Array.isArray(navItems)).toBe(true);
      expect(navItems.length).toBeGreaterThan(0);
    });

    it("should have correct navigation items", () => {
      const expectedItems = [
        { label: "Home", href: "#home" },
        { label: "About", href: "#about" },
        { label: "Career & Education", href: "#career-education" },
        { label: "Skills", href: "#skills" },
        { label: "Projects", href: "#projects" },
        { label: "Contact", href: "#contact" },
      ];

      expect(navItems).toEqual(expectedItems);
    });

    it("should have valid href values for each item", () => {
      navItems.forEach((item) => {
        expect(item.href).toMatch(/^#/);
        expect(typeof item.href).toBe("string");
        expect(item.href.length).toBeGreaterThan(1);
      });
    });

    it("should have valid label values for each item", () => {
      navItems.forEach((item) => {
        expect(typeof item.label).toBe("string");
        expect(item.label.length).toBeGreaterThan(0);
      });
    });
  });

  describe("socialLinks", () => {
    it("should export socialLinks array with correct structure", () => {
      expect(Array.isArray(socialLinks)).toBe(true);
      expect(socialLinks.length).toBeGreaterThan(0);
    });

    it("should have correct social links", () => {
      const expectedLabels = ["Dashboard", "GitHub", "LinkedIn"];
      const actualLabels = socialLinks.map((link) => link.label);

      expect(actualLabels).toEqual(expectedLabels);
    });

    it("should have valid href values for each social link", () => {
      socialLinks.forEach((link) => {
        expect(typeof link.href).toBe("string");
        expect(link.href.length).toBeGreaterThan(0);
        expect(link.href).toMatch(/^(https?:\/\/|\/)/);
      });
    });

    it("should have valid label values for each social link", () => {
      socialLinks.forEach((link) => {
        expect(typeof link.label).toBe("string");
        expect(link.label.length).toBeGreaterThan(0);
      });
    });

    it("should have icon functions for each social link", () => {
      socialLinks.forEach((link) => {
        expect(typeof link.icon).toBe("function");
      });
    });

    it("should have Dashboard link pointing to correct path", () => {
      const dashboardLink = socialLinks.find(
        (link) => link.label === "Dashboard",
      );
      expect(dashboardLink).toBeDefined();
      expect(dashboardLink?.href).toBe("/harsh-portfolio/dashboard.html");
    });

    it("should have GitHub link with valid URL", () => {
      const githubLink = socialLinks.find((link) => link.label === "GitHub");
      expect(githubLink).toBeDefined();
      expect(githubLink?.href).toMatch(/^https:\/\/github\.com/);
    });

    it("should have LinkedIn link with valid URL", () => {
      const linkedinLink = socialLinks.find(
        (link) => link.label === "LinkedIn",
      );
      expect(linkedinLink).toBeDefined();
      expect(linkedinLink?.href).toMatch(/^https:\/\/(www\.)?linkedin\.com/);
    });
  });
});
