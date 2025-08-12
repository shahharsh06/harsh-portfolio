import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  beforeAll,
} from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/utils";
import Hero from "../Hero";

// Mock the image imports
vi.mock("@/assets/profile/harsh_profile_image.jpg", () => ({
  default: "/mock-profile-image.jpg",
}));

vi.mock("@/assets/resume/Harsh_SE_Resume.pdf", () => ({
  default: "/mock-resume.pdf",
}));

describe("Hero Component", () => {
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

    // Mock document.querySelector
    const mockElement = {
      scrollIntoView: vi.fn(),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders hero section with correct structure", () => {
    render(<Hero />);

    // Check main section by ID
    const heroSection = screen.getByTestId("hero-section");
    expect(heroSection).toBeInTheDocument();

    // Check hero image (alt text may evolve; match broadly)
    const heroImage = screen.getByAltText(/Harsh Shah.*Engineer/i);
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute("src", "/mock-profile-image.jpg");
  });

  it("displays hero content with name and title", () => {
    render(<Hero />);

    // Check greeting
    expect(screen.getByText(/Hi, I'm/)).toBeInTheDocument();

    // Check description
    expect(
      screen.getByText(/Passionate about building intelligent systems/),
    ).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<Hero />);

    // Check Get In Touch button
    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    expect(getInTouchButton).toBeInTheDocument();
    expect(getInTouchButton).toHaveTextContent("Get In Touch");

    // Check Download Resume link
    const downloadResumeLink = screen.getByRole("link", {
      name: /download resume/i,
    });
    expect(downloadResumeLink).toBeInTheDocument();
    expect(downloadResumeLink).toHaveAttribute("href", "/mock-resume.pdf");
    expect(downloadResumeLink).toHaveAttribute("download");
  });

  it("displays statistics section", () => {
    render(<Hero />);

    // Check statistics
    expect(screen.getByText("1+")).toBeInTheDocument();
    expect(screen.getByText(/Years\s*Experience/i)).toBeInTheDocument();
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText(/Projects\s*Completed/i)).toBeInTheDocument();
    expect(screen.getByText("25+")).toBeInTheDocument();
    expect(screen.getByText(/Technologies/i)).toBeInTheDocument();
  });

  it("handles Get In Touch button click", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    await user.click(getInTouchButton);

    // Verify scroll function was called
    expect(document.querySelector).toHaveBeenCalledWith("#contact");
  });

  it("handles Download Resume link click", async () => {
    const user = userEvent.setup();
    render(<Hero />);

    const downloadResumeLink = screen.getByRole("link", {
      name: /download resume/i,
    });
    await user.click(downloadResumeLink);

    // Link should have correct attributes
    expect(downloadResumeLink).toHaveAttribute("href", "/mock-resume.pdf");
    expect(downloadResumeLink).toHaveAttribute("download");
  });

  it("displays typewriter animation for name", async () => {
    render(<Hero />);

    // The name should be visible (typewriter effect)
    await waitFor(
      () => {
        expect(screen.getByText("Harsh Shah")).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });

  it("displays typewriter animation for titles", async () => {
    render(<Hero />);

    // Check for title animation
    await waitFor(
      () => {
        const titleElement = screen.getByText(
          /Machine Learning Engineer|Data Scientist|AI Enthusiast|Python Developer/,
        );
        expect(titleElement).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("handles scroll functions with null elements", () => {
    // Mock querySelector to return null
    vi.spyOn(document, "querySelector").mockReturnValue(null);

    render(<Hero />);

    // This should not crash even when elements are not found
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("handles scroll functions with undefined scrollIntoView", () => {
    // Mock element without scrollIntoView method
    const mockElement = {};
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );

    render(<Hero />);

    // This should not crash even when scrollIntoView is undefined
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
  });

  it("handles edge case when scroll functions are called", async () => {
    const user = userEvent.setup();
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Hero />);

    // Mock scrollIntoView to throw an error
    const mockElement = {
      scrollIntoView: vi.fn().mockImplementation(() => {
        throw new Error("Scroll error");
      }),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );

    // This should not crash the component
    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    await user.click(getInTouchButton);

    // Component should still be functional
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();

    // Verify that the error was handled gracefully
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Scroll to contact failed:",
      expect.any(Error),
    );

    consoleWarnSpy.mockRestore();
  });

  it("tests scrollToContact function directly", () => {
    const mockElement = {
      scrollIntoView: vi.fn(),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );

    render(<Hero />);

    // Get the Get In Touch button and click it to trigger scrollToContact
    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    getInTouchButton.click();

    // Verify scrollToContact was called with correct parameters
    expect(document.querySelector).toHaveBeenCalledWith("#contact");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("tests scrollToAbout function directly", () => {
    const mockElement = {
      scrollIntoView: vi.fn(),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );

    render(<Hero />);

    // Find and click the "Scroll to explore" button to trigger scrollToAbout
    const scrollButton = screen.getByRole("button", {
      name: /scroll to explore/i,
    });
    scrollButton.click();

    // Verify scrollToAbout was called with correct parameters
    expect(document.querySelector).toHaveBeenCalledWith("#about");
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
    });
  });

  it("handles scrollToContact with missing element gracefully", () => {
    // Mock querySelector to return null
    vi.spyOn(document, "querySelector").mockReturnValue(null);
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Hero />);

    // Click Get In Touch button
    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    getInTouchButton.click();

    // Should not crash and should log warning
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();

    consoleWarnSpy.mockRestore();
  });

  it("handles scrollToAbout with missing element gracefully", () => {
    // Mock querySelector to return null
    vi.spyOn(document, "querySelector").mockReturnValue(null);
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Hero />);

    // Find "Scroll to explore" button if it exists
    const scrollButton = screen.queryByRole("button", {
      name: /scroll to explore/i,
    });
    if (scrollButton) {
      scrollButton.click();

      // Should not crash and should log warning
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    }

    consoleWarnSpy.mockRestore();
  });

  it("handles scrollToContact with scrollIntoView error gracefully", () => {
    const mockElement = {
      scrollIntoView: vi.fn().mockImplementation(() => {
        throw new Error("Scroll error");
      }),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Hero />);

    // Click Get In Touch button
    const getInTouchButton = screen.getByRole("button", {
      name: /get in touch/i,
    });
    getInTouchButton.click();

    // Should not crash and should log warning
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "Scroll to contact failed:",
      expect.any(Error),
    );

    consoleWarnSpy.mockRestore();
  });

  it("handles scrollToAbout with scrollIntoView error gracefully", () => {
    const mockElement = {
      scrollIntoView: vi.fn().mockImplementation(() => {
        throw new Error("Scroll error");
      }),
    };
    vi.spyOn(document, "querySelector").mockReturnValue(
      mockElement as unknown as Element,
    );
    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    render(<Hero />);

    // Find "Scroll to explore" button if it exists
    const scrollButton = screen.queryByRole("button", {
      name: /scroll to explore/i,
    });
    if (scrollButton) {
      scrollButton.click();

      // Should not crash and should log warning
      expect(screen.getByTestId("hero-section")).toBeInTheDocument();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Scroll to about failed:",
        expect.any(Error),
      );
    }

    consoleWarnSpy.mockRestore();
  });
});
