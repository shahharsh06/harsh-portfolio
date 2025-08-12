import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "../About";

describe("About Component", () => {
  it("renders the about section with correct heading", () => {
    render(<About />);

    const heading = screen.getByRole("heading", { name: /about me/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays personal information and journey", () => {
    render(<About />);

    // Check for journey section
    const journeyHeading = screen.getByRole("heading", { name: /my journey/i });
    expect(journeyHeading).toBeInTheDocument();

    // Check for personal content
    expect(
      screen.getByText(/Computer Science and Engineering/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Texas A&M University/)).toBeInTheDocument();
    expect(screen.getByText(/Haricomp Systems/)).toBeInTheDocument();
  });

  it("displays skill tags", () => {
    render(<About />);

    // Check for skill tags - use getAllByText to handle multiple instances
    const skillTags = screen.getAllByText("Python");
    expect(skillTags.length).toBeGreaterThan(0);

    const mlTags = screen.getAllByText("Machine Learning");
    expect(mlTags.length).toBeGreaterThan(0);

    const dataScienceTags = screen.getAllByText("Data Science");
    expect(dataScienceTags.length).toBeGreaterThan(0);

    const tensorflowTags = screen.getAllByText("TensorFlow");
    expect(tensorflowTags.length).toBeGreaterThan(0);

    const cppTags = screen.getAllByText("C++");
    expect(cppTags.length).toBeGreaterThan(0);
  });

  it("displays highlights section with expertise areas", () => {
    render(<About />);

    // Check for highlights - use getAllByText to handle multiple instances
    const aiExpertise = screen.getAllByText("AI/ML Expertise");
    expect(aiExpertise.length).toBeGreaterThan(0);

    const fullStack = screen.getAllByText("Full-Stack Development");
    expect(fullStack.length).toBeGreaterThan(0);

    const dataScience = screen.getAllByText("Data Science");
    expect(dataScience.length).toBeGreaterThan(0);

    const performance = screen.getAllByText("Performance Optimization");
    expect(performance.length).toBeGreaterThan(0);
  });

  it("has consistent styling with theme", () => {
    render(<About />);

    // Get the actual DOM element, not a mock
    const aboutSection = screen.getByTestId("about-section");
    expect(aboutSection).toHaveClass("bg-muted/30");
  });
});
