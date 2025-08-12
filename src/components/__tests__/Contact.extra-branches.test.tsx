import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/utils";
import Contact from "../Contact";
import { Toaster } from "@/components/ui/toaster";

// Mock emailjs to avoid network
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn().mockResolvedValue({ status: 200 }),
  },
}));

describe("Contact Component - extra branches", () => {
  beforeEach(() => {
    const mockIntersectionObserver = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    // @ts-expect-error - jsdom global
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("shows invalid email toast and prevents submit", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Contact />
        <Toaster />
      </>,
    );

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "not-an-email");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "Body");

    // Use submit event to bypass native email validation blocking
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(
      await screen.findByText(
        (content) => content.includes("Invalid Email"),
        {},
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        (content) => content.includes("Please enter a valid email address"),
        {},
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
  }, 10000); // Add explicit timeout

  it("blocks disposable email domains and shows toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Contact />
        <Toaster />
      </>,
    );

    // Use await for each user interaction to prevent hanging
    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/email/i), "user@mailinator.com");
    await user.type(screen.getByLabelText(/subject/i), "Hello");
    await user.type(screen.getByLabelText(/message/i), "Body");

    // Valid email => normal click is fine
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for toast to appear with explicit timeout
    expect(
      await screen.findByText(
        (content) => content.includes("Disposable Email Detected"),
        {},
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        (content) =>
          content.includes("Please use a real, non-temporary email address."),
        {},
        { timeout: 5000 },
      ),
    ).toBeInTheDocument();
  }, 10000); // Add explicit timeout
});
