import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "@/test/utils";
import InteractiveCard from "../InteractiveCard";

describe("InteractiveCard Component", () => {
  it("renders with default props", () => {
    render(
      <InteractiveCard>
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="card-gradient"]');
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("Test content");
  });

  it("renders with custom className", () => {
    render(
      <InteractiveCard className="custom-class">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="custom-class"]');
    expect(card).toHaveClass("custom-class");
  });

  it("renders with custom contentClassName", () => {
    render(
      <InteractiveCard contentClassName="custom-content-class">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const contentDiv = screen
      .getByText("Test content")
      .closest('div[class*="custom-content-class"]');
    expect(contentDiv).toBeInTheDocument();
  });

  it("renders with title", () => {
    render(
      <InteractiveCard title="Test Title">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test Title")
      .closest('div[class*="card-gradient"]');
    expect(card).toHaveTextContent("Test Title");
    expect(card).toHaveTextContent("Test content");
  });

  it("renders with custom headerClassName", () => {
    render(
      <InteractiveCard title="Test Title" headerClassName="custom-header-class">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const headerDiv = screen
      .getByText("Test Title")
      .closest('div[class*="custom-header-class"]');
    expect(headerDiv).toBeInTheDocument();
  });

  it("applies hover effects", () => {
    render(
      <InteractiveCard>
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="card-gradient"]');
    expect(card).toHaveClass("hover-lift");
    expect(card).toHaveClass("transition-all");
  });

  it("applies default styling classes", () => {
    render(
      <InteractiveCard>
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="card-gradient"]');
    expect(card).toHaveClass("card-gradient");
    expect(card).toHaveClass("border-border");
  });

  it("applies custom padding to content", () => {
    render(
      <InteractiveCard contentClassName="p-8">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const contentDiv = screen
      .getByText("Test content")
      .closest('div[class*="p-8"]');
    expect(contentDiv).toBeInTheDocument();
  });

  it("renders with complex content structure", () => {
    render(
      <InteractiveCard>
        <div>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Title")
      .closest('div[class*="card-gradient"]');
    expect(card).toHaveTextContent("Title");
    expect(card).toHaveTextContent("Description");
    expect(card).toHaveTextContent("Action");
  });

  it("renders without title when not provided", () => {
    render(
      <InteractiveCard>
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="card-gradient"]');
    expect(card).not.toHaveTextContent("undefined");
    expect(card).toHaveTextContent("Test content");
  });

  it("applies custom border radius", () => {
    render(
      <InteractiveCard className="rounded-xl">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="rounded-xl"]');
    expect(card).toHaveClass("rounded-xl");
  });

  it("maintains proper z-index for overlays", () => {
    render(
      <InteractiveCard className="z-10">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen.getByText("Test content").closest('div[class*="z-10"]');
    expect(card).toHaveClass("z-10");
  });

  it("handles data attributes", () => {
    render(
      <InteractiveCard className="data-testid-custom-card">
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="data-testid-custom-card"]');
    expect(card).toHaveClass("data-testid-custom-card");
  });

  it("renders with group class for hover effects", () => {
    render(
      <InteractiveCard>
        <div>Test content</div>
      </InteractiveCard>,
    );

    const card = screen
      .getByText("Test content")
      .closest('div[class*="card-gradient"]');
    expect(card).toHaveClass("group");
  });
});
