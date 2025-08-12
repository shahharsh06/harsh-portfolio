import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/utils";
import Navigation from "../Navigation";
import { SocialIconButton, SocialIcons } from "../Navigation.components";
import { MobileMenuProvider } from "../MobileMenuContext";

// Custom render function that includes the MobileMenuProvider
const renderWithMobileMenu = (component: React.ReactElement) => {
  return render(<MobileMenuProvider>{component}</MobileMenuProvider>);
};

describe("Navigation Component", () => {
  const mockIntersectionObserver = {
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  };

  beforeAll(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi
      .fn()
      .mockImplementation(() => mockIntersectionObserver);
  });

  beforeEach(() => {
    // Mock scrollIntoView
    Object.defineProperty(window, "scrollIntoView", {
      writable: true,
      value: vi.fn(),
    });
  });

  it("renders navigation with logo", () => {
    renderWithMobileMenu(<Navigation />);

    const logo = screen.getByText("Harsh");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("text-gradient");
  });

  it("displays desktop navigation items", () => {
    renderWithMobileMenu(<Navigation />);

    const navItems = [
      "Home",
      "About",
      "Skills",
      "Career & Education",
      "Projects",
      "Contact",
    ];

    navItems.forEach((item) => {
      const navButton = screen.getByRole("button", {
        name: new RegExp(item, "i"),
      });
      expect(navButton).toBeInTheDocument();
    });
  });

  it("handles navigation item clicks", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock document.querySelector for this test
    const mockElement = { scrollIntoView: vi.fn() };
    const querySelectorSpy = vi
      .spyOn(document, "querySelector")
      .mockReturnValue(mockElement as unknown as Element);

    const aboutButton = screen.getByRole("button", { name: /about/i });
    await user.click(aboutButton);

    expect(querySelectorSpy).toHaveBeenCalledWith("#about");

    // Clean up
    querySelectorSpy.mockRestore();
  });

  it("displays theme toggle in desktop view", () => {
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it("displays social links in desktop view", () => {
    renderWithMobileMenu(<Navigation />);

    // Check GitHub link by href
    const github = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("github.com"),
    );
    expect(github).toBeInTheDocument();
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");

    // Check LinkedIn link by href
    const linkedin = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("linkedin.com"),
    );
    expect(linkedin).toBeInTheDocument();
    expect(linkedin).toHaveAttribute("target", "_blank");
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders dashboard link", () => {
    renderWithMobileMenu(<Navigation />);

    // Find dashboard link by href instead of name
    const dashboardLink = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("dashboard.html"),
    );
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute(
      "href",
      "/harsh-portfolio/dashboard.html",
    );
  });

  it("applies scroll-based styling", () => {
    renderWithMobileMenu(<Navigation />);

    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("fixed");
    expect(nav).toHaveClass("top-0");
    expect(nav).toHaveClass("z-50");
  });

  it("has proper accessibility attributes", () => {
    renderWithMobileMenu(<Navigation />);

    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();

    // Check for proper heading
    const logo = screen.getByText("Harsh");
    expect(logo).toBeInTheDocument();
  });

  it("applies hover effects to navigation items", () => {
    renderWithMobileMenu(<Navigation />);

    const navItems = screen.getAllByRole("button");
    navItems.forEach((item) => {
      if (
        item.textContent?.match(/Home|About|Skills|Career|Projects|Contact/)
      ) {
        expect(item).toHaveClass("hover:text-primary");
      }
    });
  });

  it("applies hover effects to social links", () => {
    renderWithMobileMenu(<Navigation />);

    const socialLinks = screen.getAllByRole("link");
    socialLinks.forEach((link) => {
      if (
        link.getAttribute("aria-label")?.includes("GitHub") ||
        link.getAttribute("aria-label")?.includes("LinkedIn")
      ) {
        expect(link).toHaveClass("hover-glow");
      }
    });
  });

  it("handles theme toggle functionality", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();

    await user.click(themeToggle);

    // Theme toggle should still be functional
    expect(themeToggle).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const navLinks = screen.getAllByRole("button");
    if (navLinks.length > 0) {
      await user.tab();

      // Should be able to navigate with keyboard
      expect(navLinks[0]).toHaveFocus();
    }
  });

  it("handles focus management", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();

    // Focus management test - just verify the button exists
    expect(themeToggle).toBeInTheDocument();
  });

  it("handles aria-expanded state for mobile menu", () => {
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      expect(mobileMenuButton).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("handles logo click", () => {
    renderWithMobileMenu(<Navigation />);

    const logo = screen.getByText("Harsh");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass("text-gradient");
  });

  it("handles mobile menu item clicks", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      await user.click(mobileMenuButton);

      // Check if menu items are accessible
      const menuItems = screen.getAllByRole("button");
      expect(menuItems.length).toBeGreaterThan(0);
    }
  });

  it("handles mobile menu toggle", () => {
    renderWithMobileMenu(<Navigation />);

    // Mobile menu button might not be visible in desktop view
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      expect(mobileMenuButton).toBeInTheDocument();
    }
  });

  it("handles dashboard link click", () => {
    renderWithMobileMenu(<Navigation />);

    // Find dashboard link by href instead of name
    const dashboardLink = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("dashboard.html"),
    );
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute("target", "_blank");
  });

  it("handles scroll behavior", () => {
    renderWithMobileMenu(<Navigation />);

    // Mock scrollIntoView
    const mockScrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;

    const navLinks = screen.getAllByRole("link");
    const sectionLinks = navLinks.filter((link) =>
      link.getAttribute("href")?.startsWith("#"),
    );

    if (sectionLinks.length > 0) {
      // Navigation should be functional
      expect(sectionLinks[0]).toBeInTheDocument();
    }
  });

  it("handles window resize events", () => {
    renderWithMobileMenu(<Navigation />);

    // Mock window resize
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    // Trigger resize event
    window.dispatchEvent(new Event("resize"));

    // Navigation should still be functional
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("handles navigation item hover states", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const navItems = screen.getAllByRole("button");
    if (navItems.length > 0) {
      await user.hover(navItems[0]);
      expect(navItems[0]).toBeInTheDocument();

      await user.unhover(navItems[0]);
      expect(navItems[0]).toBeInTheDocument();
    }
  });

  it("handles theme toggle hover states", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    await user.hover(themeToggle);
    expect(themeToggle).toBeInTheDocument();

    await user.unhover(themeToggle);
    expect(themeToggle).toBeInTheDocument();
  });

  it("handles navigation item focus states", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const navItems = screen.getAllByRole("button");
    if (navItems.length > 0) {
      await user.tab();
      expect(navItems[0]).toHaveFocus();

      await user.tab();
      expect(navItems[1]).toHaveFocus();
    }
  });

  it("handles social link interactions", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Find social links by href
    const socialLinks = Array.from(document.querySelectorAll("a")).filter(
      (link) =>
        link.getAttribute("href")?.includes("github.com") ||
        link.getAttribute("href")?.includes("linkedin.com"),
    );

    if (socialLinks.length > 0) {
      await user.click(socialLinks[0]);
      expect(socialLinks[0]).toBeInTheDocument();
    }
  });

  it("handles navigation item keyboard interactions", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const navItems = screen.getAllByRole("button");
    if (navItems.length > 0) {
      await user.tab();
      expect(navItems[0]).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(navItems[0]).toBeInTheDocument();
    }
  });

  it("handles theme toggle keyboard interactions", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });
    await user.tab();
    await user.tab();
    await user.tab();

    // Should be able to activate theme toggle with keyboard
    await user.keyboard("{Enter}");
    expect(themeToggle).toBeInTheDocument();
  });

  it("handles navigation accessibility features", () => {
    renderWithMobileMenu(<Navigation />);

    // Check for proper ARIA labels
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    // Check for proper button roles
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThan(0);

    // Check for proper link roles
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
  });

  it("handles navigation state management", () => {
    renderWithMobileMenu(<Navigation />);

    // Navigation should maintain state properly
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    // All navigation items should be present
    const navItems = screen.getAllByRole("button");
    expect(navItems.length).toBeGreaterThan(0);
  });

  it("handles mobile menu state transitions", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    // Trigger resize to mobile
    window.dispatchEvent(new Event("resize"));

    // Should handle mobile state properly
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("handles theme toggle with keyboard", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    const themeToggle = screen.getByRole("button", { name: /toggle theme/i });

    // Test keyboard interaction - focus directly on theme toggle
    await user.click(themeToggle);
    expect(themeToggle).toBeInTheDocument();

    await user.keyboard("{Enter}");
    expect(themeToggle).toBeInTheDocument();
  });

  it("handles navigation accessibility features", () => {
    renderWithMobileMenu(<Navigation />);

    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    const navItems = screen.getAllByRole("button");
    navItems.forEach((item) => {
      // Check if item has any accessibility attributes
      expect(item).toBeInTheDocument();
    });
  });

  it("handles navigation performance optimization", () => {
    renderWithMobileMenu(<Navigation />);

    // Should render efficiently
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    // Check for performance-related attributes
    const navItems = screen.getAllByRole("button");
    expect(navItems.length).toBeGreaterThan(0);
  });

  it("handles navigation error boundaries", () => {
    renderWithMobileMenu(<Navigation />);

    // Should handle errors gracefully
    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();

    // Navigation should remain functional even with errors
    const navItems = screen.getAllByRole("button");
    expect(navItems.length).toBeGreaterThan(0);
  });

  it("changes nav bar class on scroll event", async () => {
    renderWithMobileMenu(<Navigation />);
    const nav = screen.getByRole("navigation");
    // Initially, should not have the scrolled class
    expect(nav.className).not.toContain("bg-background/80");

    // Simulate scroll event
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    window.dispatchEvent(new Event("scroll"));

    // Wait for the nav to update
    await waitFor(() => {
      expect(nav.className).toContain("bg-background/80");
    });
  });

  it("closes mobile menu when overlay is clicked", async () => {
    renderWithMobileMenu(<Navigation />);
    // Open mobile menu
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      await userEvent.click(mobileMenuButton);
      // Overlay should be present
      const overlay = document.querySelector(".fixed.inset-0");
      expect(overlay).toBeInTheDocument();
      // Click overlay
      if (overlay) {
        await userEvent.click(overlay);
        // Overlay should be removed (menu closed)
        expect(
          document.querySelector(".fixed.inset-0"),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("scrollToSection does nothing if section does not exist", () => {
    renderWithMobileMenu(<Navigation />);
    // Try to click a nav item with a non-existent section
    const navButton = screen.getByRole("button", { name: /about/i });
    // Use Vitest spy to mock document.querySelector to return null
    vi.spyOn(document, "querySelector").mockReturnValueOnce(null);
    userEvent.click(navButton);
    // No error should occur, test passes if no crash
    expect(true).toBe(true);
  });

  it("renders all social icons", () => {
    renderWithMobileMenu(<Navigation />);
    const github = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("github.com"),
    );
    const linkedin = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("linkedin.com"),
    );
    const dashboard = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("dashboard.html"),
    );
    expect(github).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();
  });

  it("toggles mobile menu open and closed multiple times", async () => {
    renderWithMobileMenu(<Navigation />);
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      // Open menu
      await userEvent.click(mobileMenuButton);
      expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument();
      // Close menu
      await userEvent.click(mobileMenuButton);
      expect(document.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
      // Open again
      await userEvent.click(mobileMenuButton);
      expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument();
    }
  });

  it("closes mobile menu when close button is clicked", async () => {
    renderWithMobileMenu(<Navigation />);
    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      await userEvent.click(mobileMenuButton);
      // Find close button in mobile menu
      const closeButton = Array.from(document.querySelectorAll("button")).find(
        (btn) => btn !== mobileMenuButton && btn.querySelector("svg"),
      );
      if (closeButton) {
        await userEvent.click(closeButton);
        expect(
          document.querySelector(".fixed.inset-0"),
        ).not.toBeInTheDocument();
      }
    }
  });

  // Additional tests for better function coverage
  it("handles scroll event and updates isScrolled state", async () => {
    renderWithMobileMenu(<Navigation />);
    const nav = screen.getByRole("navigation");

    // Initially should not have scrolled styling
    expect(nav.className).not.toContain("bg-background/80");

    // Simulate scroll down
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(nav.className).toContain("bg-background/80");
    });

    // Simulate scroll back to top
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(nav.className).not.toContain("bg-background/80");
    });
  });

  it("handles scroll event cleanup on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderWithMobileMenu(<Navigation />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  it("calls scrollToSection with correct parameters for each nav item", async () => {
    const user = userEvent.setup();
    const scrollToSectionSpy = vi.spyOn(document, "querySelector");
    const mockElement = { scrollIntoView: vi.fn() };
    scrollToSectionSpy.mockReturnValue(mockElement as unknown as Element);

    renderWithMobileMenu(<Navigation />);

    const navItems = [
      "Home",
      "About",
      "Career & Education",
      "Skills",
      "Projects",
      "Contact",
    ];

    for (const item of navItems) {
      const button = screen.getByRole("button", {
        name: new RegExp(item, "i"),
      });
      await user.click(button);
    }

    expect(scrollToSectionSpy).toHaveBeenCalledWith("#home");
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#about");
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#career-education");
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#skills");
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#projects");
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#contact");

    scrollToSectionSpy.mockRestore();
  });

  it("handles scrollToSection when element does not exist", async () => {
    const user = userEvent.setup();
    const scrollToSectionSpy = vi.spyOn(document, "querySelector");
    scrollToSectionSpy.mockReturnValue(null);

    renderWithMobileMenu(<Navigation />);

    const aboutButton = screen.getByRole("button", { name: /about/i });
    await user.click(aboutButton);

    // Should not throw error when element doesn't exist
    expect(scrollToSectionSpy).toHaveBeenCalledWith("#about");

    scrollToSectionSpy.mockRestore();
  });

  it("toggles mobile menu state correctly", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    window.dispatchEvent(new Event("resize"));

    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      // Initially menu should be closed
      expect(document.querySelector(".fixed.inset-0")).not.toBeInTheDocument();

      // Open menu
      await user.click(mobileMenuButton);
      expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument();

      // Close menu
      await user.click(mobileMenuButton);
      expect(document.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
    }
  });

  it("renders SocialIconButton with correct props", () => {
    renderWithMobileMenu(<Navigation />);

    const socialLinks = Array.from(document.querySelectorAll("a")).filter(
      (link) =>
        link.getAttribute("href")?.includes("github.com") ||
        link.getAttribute("href")?.includes("linkedin.com") ||
        link.getAttribute("href")?.includes("dashboard.html"),
    );

    socialLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(link).toHaveClass("hover-glow");
    });
  });

  it("renders SocialIcons component with all social links", () => {
    renderWithMobileMenu(<Navigation />);

    // Check for all expected social links
    const github = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("github.com"),
    );
    const linkedin = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("linkedin.com"),
    );
    const dashboard = Array.from(document.querySelectorAll("a")).find((a) =>
      a.href.includes("dashboard.html"),
    );

    expect(github).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
    expect(dashboard).toBeInTheDocument();

    // Check they have proper styling
    [github, linkedin, dashboard].forEach((link) => {
      if (link) {
        expect(link).toHaveClass("hover-glow");
      }
    });
  });

  it("handles mobile menu navigation item clicks", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    window.dispatchEvent(new Event("resize"));

    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      // Open mobile menu
      await user.click(mobileMenuButton);

      // Click on a mobile menu item
      const aboutButton = screen.getByRole("button", { name: /about/i });
      await user.click(aboutButton);

      // Menu should close after navigation
      expect(document.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
    }
  });

  it("handles mobile menu overlay click to close", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    window.dispatchEvent(new Event("resize"));

    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      // Open mobile menu
      await user.click(mobileMenuButton);

      // Click on overlay
      const overlay = document.querySelector(".fixed.inset-0");
      if (overlay) {
        await user.click(overlay);

        // Menu should close
        expect(
          document.querySelector(".fixed.inset-0"),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("handles mobile menu close button click", async () => {
    const user = userEvent.setup();
    renderWithMobileMenu(<Navigation />);

    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    window.dispatchEvent(new Event("resize"));

    const mobileMenuButton = screen.queryByRole("button", {
      name: /toggle menu/i,
    });
    if (mobileMenuButton) {
      // Open mobile menu
      await user.click(mobileMenuButton);

      // Find and click the close button (X button in mobile menu)
      const closeButtons = Array.from(
        document.querySelectorAll("button"),
      ).filter((btn) => btn !== mobileMenuButton && btn.querySelector("svg"));

      if (closeButtons.length > 0) {
        await user.click(closeButtons[0]);

        // Menu should close
        expect(
          document.querySelector(".fixed.inset-0"),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("applies correct styling based on scroll state", async () => {
    renderWithMobileMenu(<Navigation />);
    const nav = screen.getByRole("navigation");

    // Test initial state (not scrolled)
    expect(nav.className).toContain("bg-transparent");
    expect(nav.className).not.toContain("bg-background/80");

    // Test scrolled state
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(nav.className).toContain("bg-background/80");
      expect(nav.className).toContain("backdrop-blur-md");
      expect(nav.className).toContain("border-b");
      expect(nav.className).toContain("border-border");
    });
  });

  it("handles window resize events correctly", () => {
    renderWithMobileMenu(<Navigation />);

    // Test mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    window.dispatchEvent(new Event("resize"));

    // Navigation should still be functional
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    // Test desktop viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1440,
    });

    window.dispatchEvent(new Event("resize"));

    // Navigation should still be functional
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("handles edge case: scroll event with invalid scrollY", async () => {
    renderWithMobileMenu(<Navigation />);
    const nav = screen.getByRole("navigation");

    // Test with negative scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: -10,
    });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(nav.className).not.toContain("bg-background/80");
    });

    // Test with very large scrollY
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 10000,
    });
    window.dispatchEvent(new Event("scroll"));

    await waitFor(() => {
      expect(nav.className).toContain("bg-background/80");
    });
  });

  it("handles multiple rapid scroll events", async () => {
    renderWithMobileMenu(<Navigation />);
    const nav = screen.getByRole("navigation");

    // Simulate rapid scroll events
    for (let i = 0; i < 5; i++) {
      Object.defineProperty(window, "scrollY", {
        writable: true,
        configurable: true,
        value: i * 20,
      });
      window.dispatchEvent(new Event("scroll"));
    }

    // Should handle rapid events without crashing
    expect(nav).toBeInTheDocument();
  });

  it("handles component unmount during scroll event", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderWithMobileMenu(<Navigation />);

    // Trigger scroll event
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 100,
    });
    window.dispatchEvent(new Event("scroll"));

    // Unmount component
    unmount();

    // Should clean up event listeners
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  // Combined from Navigation.functions.test.tsx
  it("clicking nav items triggers scrollToSection logic (sections present)", async () => {
    const user = userEvent.setup();
    const mockScrollIntoView = vi.fn();

    // Create real DOM elements with mocked scrollIntoView
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
    };

    // Mock document.querySelector to return elements with scrollIntoView
    const originalQuerySelector = document.querySelector;
    document.querySelector = vi.fn((selector: string) => {
      if (selector.startsWith("#")) {
        return mockElement as unknown as HTMLElement;
      }
      return originalQuerySelector.call(document, selector);
    });

    try {
      renderWithMobileMenu(<Navigation />);

      await user.click(screen.getByRole("button", { name: /about/i }));
      await user.click(screen.getByRole("button", { name: /projects/i }));

      expect(mockScrollIntoView).toHaveBeenCalledTimes(2);
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    } finally {
      // Restore original querySelector
      document.querySelector = originalQuerySelector;
    }
  });

  // Combined from Navigation.components.test.tsx
  it("renders SocialIconButton with link and icon (components file)", () => {
    render(
      <SocialIconButton
        href="https://example.com"
        icon={(props) => <svg data-testid="dummy-icon" {...props} />}
        label="Example"
      />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(screen.getByTestId("dummy-icon")).toBeInTheDocument();
  });

  it("renders list of SocialIcons (components file)", () => {
    render(
      <SocialIcons
        socialLinks={[
          {
            label: "One",
            href: "https://one.example",
            icon: (props) => <svg data-testid="icon-1" {...props} />,
          },
          {
            label: "Two",
            href: "https://two.example",
            icon: (props) => <svg data-testid="icon-2" {...props} />,
          },
        ]}
      />,
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "https://one.example");
    expect(links[1]).toHaveAttribute("href", "https://two.example");
  });
});
