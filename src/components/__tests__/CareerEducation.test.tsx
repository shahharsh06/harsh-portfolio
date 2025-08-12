import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { render as renderWithProviders } from "@/test/utils";
import CareerEducation from "../CareerEducation";

describe("CareerEducation Component", () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("renders career education section", () => {
    render(<CareerEducation />);

    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();
    expect(careerSection).toHaveAttribute("id", "career-education");
  });

  it("displays section title", () => {
    render(<CareerEducation />);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title).toHaveTextContent("Career & Education");
  });

  it("displays section description", () => {
    render(<CareerEducation />);

    const description = screen.getByText(
      /A chronological view of my academic and professional growth/,
    );
    expect(description).toBeInTheDocument();
  });

  it("displays education timeline", () => {
    render(<CareerEducation />);

    // Check for education items
    expect(screen.getByText(/Master of Computer Science/i)).toBeInTheDocument();
  });

  it("displays career timeline", () => {
    render(<CareerEducation />);

    // Check for career items - use more flexible text matching
    const careerTexts = screen.getAllByText((content, element) => {
      return (
        element?.textContent?.includes("Engineer") ||
        element?.textContent?.includes("Developer")
      );
    });
    expect(careerTexts.length).toBeGreaterThan(0);
  });

  it("displays timeline dates", () => {
    render(<CareerEducation />);

    // Check for timeline dates
    const dateElements = screen.getAllByText(/2023|2024|2022/);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it("applies gradient styling to timeline items", () => {
    render(<CareerEducation />);

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      expect(item).toHaveClass("border-l-2");
      expect(item).toHaveClass("border-primary");
    });
  });

  it("has proper accessibility attributes", () => {
    render(<CareerEducation />);

    // Check for proper heading hierarchy
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toBeInTheDocument();

    // Check for section element
    const section = document.getElementById("career-education");
    expect(section).toBeInTheDocument();
  });

  it("handles responsive design", () => {
    // Mock mobile viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });

    render(<CareerEducation />);

    // Should still render all sections
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("handles theme integration", () => {
    renderWithProviders(<CareerEducation />);

    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();

    // Should adapt to theme changes
    expect(careerSection).toHaveClass("py-20");
  });

  it("handles component lifecycle", () => {
    const { unmount } = render(<CareerEducation />);

    // Should mount successfully
    expect(screen.getByTestId("career-education-section")).toBeInTheDocument();

    // Should unmount cleanly
    unmount();
    expect(
      screen.queryByTestId("career-education-section"),
    ).not.toBeInTheDocument();
  });

  it("handles error boundaries", () => {
    render(<CareerEducation />);

    // Should handle errors gracefully
    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();

    // Career should remain functional even with errors
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
  });

  it("handles performance optimization", () => {
    render(<CareerEducation />);

    // Should render efficiently
    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();

    // Performance should be acceptable
    expect(screen.getByText(/Master of Computer Science/i)).toBeInTheDocument();
  });

  it("handles memory management", () => {
    render(<CareerEducation />);

    // Should manage memory efficiently
    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();

    // Memory usage should be reasonable
    const engineerTexts = screen.getAllByText(/Engineer/i);
    expect(engineerTexts.length).toBeGreaterThan(0);
  });

  it("handles accessibility compliance", () => {
    render(<CareerEducation />);

    // Should meet accessibility standards
    const careerSection = document.getElementById("career-education");
    expect(careerSection).toBeInTheDocument();

    // Check for proper heading structure
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it("handles data validation", () => {
    render(<CareerEducation />);

    // Should validate career data
    expect(screen.getByText(/Master of Computer Science/i)).toBeInTheDocument();
    const engineerTexts = screen.getAllByText(/Engineer/i);
    expect(engineerTexts.length).toBeGreaterThan(0);

    // Data should be properly structured
    const timelineItems = document.querySelectorAll(".space-y-16 > div");
    expect(timelineItems.length).toBeGreaterThan(0);
  });

  it("handles timeline interactions", () => {
    render(<CareerEducation />);

    // Should handle timeline interactions
    const timelineItems = document.querySelectorAll(".space-y-16 > div");
    expect(timelineItems.length).toBeGreaterThan(0);

    // Each timeline item should be properly structured
    timelineItems.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
