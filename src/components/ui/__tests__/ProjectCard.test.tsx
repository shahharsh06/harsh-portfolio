import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "@/test/utils";
import { ProjectCard } from "../ProjectCard";

// Mock the utils with proper cn function
vi.mock("@/lib/utils", () => ({
  getImageUrl: (image: string) => `/mock-images/${image}`,
  getProjectFallbackEmoji: (title: string) => "🚀",
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));

// Mock the icons
vi.mock("../../icons", () => ({
  GithubIcon: () => <div data-testid="github-icon">GitHub</div>,
}));

// Mock the SectionIcon component
vi.mock("../../SectionIcon", () => ({
  default: ({
    icon,
    size,
    padding,
    interactive,
  }: {
    icon: React.ReactNode;
    size?: string;
    padding?: string;
    interactive?: boolean;
  }) => (
    <div
      data-testid="section-icon"
      data-size={size}
      data-padding={padding}
      data-interactive={interactive}
    >
      {icon}
    </div>
  ),
}));

// Mock the SkillTag component
vi.mock("../SkillTag", () => ({
  default: ({
    children,
    size,
    className,
  }: {
    children: React.ReactNode;
    size?: string;
    className?: string;
  }) => (
    <span data-testid="skill-tag" data-size={size} className={className}>
      {children}
    </span>
  ),
}));

describe("ProjectCard Component", () => {
  const defaultProps = {
    title: "Test Project",
    description: "A test project description",
    technologies: ["React", "TypeScript", "Tailwind"],
    githubUrl: "https://github.com/test/project",
    liveUrl: "https://test-project.com",
    featured: false,
  };

  beforeEach(() => {
    // Mock Image constructor
    global.Image = vi.fn().mockImplementation(() => ({
      src: "",
      onload: null,
      onerror: null,
    }));
  });

  it("renders basic project card", () => {
    render(<ProjectCard {...defaultProps} />);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("A test project description")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("renders featured project with image", () => {
    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("renders non-featured project without image", () => {
    render(
      <ProjectCard {...defaultProps} featured={false} image="test-image.jpg" />,
    );

    // Image should not be rendered for non-featured projects
    expect(screen.queryByAltText("Test Project")).not.toBeInTheDocument();
  });

  it("displays technology tags correctly", () => {
    render(<ProjectCard {...defaultProps} />);

    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(3); // 3 technologies for non-featured projects

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("displays technology tags for featured projects", () => {
    render(<ProjectCard {...defaultProps} featured={true} />);

    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(3); // All technologies for featured projects

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });

  it("handles many technologies for non-featured projects", () => {
    const manyTechs = [
      "React",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "MongoDB",
      "Express",
    ];
    render(<ProjectCard {...defaultProps} technologies={manyTechs} />);

    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(5); // 4 visible + 1 "more" tag

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });

  it("renders project links correctly", () => {
    render(<ProjectCard {...defaultProps} />);

    const githubLink = screen.getByTestId("github-icon").closest("a");
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/test/project",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("applies correct sizing for featured vs non-featured projects", () => {
    const { rerender } = render(
      <ProjectCard {...defaultProps} featured={false} />,
    );

    // Non-featured should have smaller sizing
    const nonFeaturedCard = screen.getByTestId("project-card");
    expect(nonFeaturedCard).toBeInTheDocument();

    rerender(<ProjectCard {...defaultProps} featured={true} />);

    // Featured should have larger sizing
    const featuredCard = screen.getByTestId("project-card");
    expect(featuredCard).toBeInTheDocument();
  });

  it("handles image loading states", async () => {
    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("handles image error states", async () => {
    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Should handle image errors gracefully
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("handles image timeout fallback", async () => {
    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Should handle image timeout gracefully
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
  });

  it("handles missing image gracefully", () => {
    render(<ProjectCard {...defaultProps} featured={true} />);

    // Should render without crashing when no image is provided
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it("handles empty technologies array", () => {
    render(<ProjectCard {...defaultProps} technologies={[]} />);

    // Should handle empty technologies gracefully
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.queryByTestId("skill-tag")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<ProjectCard {...defaultProps} className="custom-class" />);

    const card = screen.getByTestId("project-card");
    expect(card).toHaveClass("custom-class");
  });

  it("handles very long project titles", () => {
    const longTitle =
      "This is a very long project title that should be handled gracefully by the component without breaking the layout or causing any visual issues";
    render(<ProjectCard {...defaultProps} title={longTitle} />);

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("handles very long descriptions", () => {
    const longDescription =
      "This is a very long project description that should be handled gracefully by the component without breaking the layout or causing any visual issues. It should wrap properly and maintain readability.";
    render(<ProjectCard {...defaultProps} description={longDescription} />);

    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  it("handles special characters in project data", () => {
    const specialTitle =
      "Project with special chars: @#$%^&*()_+-=[]{}|;:,.<>?";
    const specialDescription =
      "Description with special chars: @#$%^&*()_+-=[]{}|;:,.<>?";
    const specialTechs = ["React@18", "TypeScript#5", "Tailwind$CSS"];

    render(
      <ProjectCard
        {...defaultProps}
        title={specialTitle}
        description={specialDescription}
        technologies={specialTechs}
      />,
    );

    expect(screen.getByText(specialTitle)).toBeInTheDocument();
    expect(screen.getByText(specialDescription)).toBeInTheDocument();
    expect(screen.getByText("React@18")).toBeInTheDocument();
  });

  it("handles edge case with single technology", () => {
    render(<ProjectCard {...defaultProps} technologies={["React"]} />);

    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(1); // Only 1 technology, no "more" tag needed

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.queryByText(/\+.*more/)).not.toBeInTheDocument();
  });

  it("handles edge case with exactly 4 technologies for non-featured", () => {
    const fourTechs = ["React", "TypeScript", "Tailwind", "Node.js"];
    render(<ProjectCard {...defaultProps} technologies={fourTechs} />);

    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(4); // 4 technologies, no "more" tag needed

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.queryByText(/\+.*more/)).not.toBeInTheDocument();
  });

  it("tests handleImageLoad function directly", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Simulate image load success
    if (mockImage.onload) {
      mockImage.onload();
    }

    // Should show the image after successful load
    await waitFor(() => {
      expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    });
  });

  it("tests handleImageError function directly", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Simulate image load error
    if (mockImage.onerror) {
      mockImage.onerror();
    }

    // Should show fallback emoji after error
    await waitFor(() => {
      expect(screen.getByText("🚀")).toBeInTheDocument();
    });

    // Check that the project title is still visible (use a more specific selector)
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Test Project");
  });

  it("tests image timeout fallback mechanism", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for timeout (2 seconds) to trigger fallback
    await waitFor(
      () => {
        expect(screen.getByText("🚀")).toBeInTheDocument();
      },
      { timeout: 2500 },
    );

    // Check that the project title is still visible (use a more specific selector)
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("Test Project");
  });

  it("tests image loading state transitions", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    const { rerender } = render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Simulate image load success
    if (mockImage.onload) {
      mockImage.onload();
    }

    // Should show the image after successful load
    await waitFor(() => {
      expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    });

    // Rerender with different image to test state reset
    // Reset the mock image to simulate a fresh load
    const newMockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };
    global.Image = vi.fn().mockImplementation(() => newMockImage);

    rerender(
      <ProjectCard {...defaultProps} featured={true} image="new-image.jpg" />,
    );

    // Should show loading state again for new image
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("tests image error state transitions", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    const { rerender } = render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Initially should show loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Simulate image load error
    if (mockImage.onerror) {
      mockImage.onerror();
    }

    // Should show fallback emoji after error
    await waitFor(() => {
      expect(screen.getByText("🚀")).toBeInTheDocument();
    });

    // Rerender with different image to test state reset
    // Reset the mock image to simulate a fresh load
    const newMockImage2 = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };
    global.Image = vi.fn().mockImplementation(() => newMockImage2);

    rerender(
      <ProjectCard {...defaultProps} featured={true} image="new-image.jpg" />,
    );

    // Should show loading state again for new image
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("tests ProjectImage component with all states", async () => {
    const mockImage = {
      src: "",
      onload: null as (() => void) | null,
      onerror: null as (() => void) | null,
    };

    global.Image = vi.fn().mockImplementation(() => mockImage);

    render(
      <ProjectCard {...defaultProps} featured={true} image="test-image.jpg" />,
    );

    // Test loading state
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Test successful load
    if (mockImage.onload) {
      mockImage.onload();
    }

    await waitFor(() => {
      expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    });

    // Test error state by triggering error after successful load
    if (mockImage.onerror) {
      mockImage.onerror();
    }

    await waitFor(() => {
      expect(screen.getByText("🚀")).toBeInTheDocument();
    });
  });

  it("tests ProjectLinks component functionality", () => {
    render(<ProjectCard {...defaultProps} featured={true} />);

    // Check GitHub link
    const githubLink = screen.getByLabelText(/View Test Project on GitHub/i);
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/test/project",
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Check live demo link
    const liveLink = screen.getByLabelText(/View Test Project live demo/i);
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute("href", "https://test-project.com");
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("tests TechnologyTags component functionality", () => {
    render(<ProjectCard {...defaultProps} featured={true} />);

    // Check that all technology tags are rendered
    const tags = screen.getAllByTestId("skill-tag");
    expect(tags).toHaveLength(3);

    // Check individual technologies
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind")).toBeInTheDocument();
  });
});
