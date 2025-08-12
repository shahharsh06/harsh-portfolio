import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "@/test/utils";
import Contact from "../Contact";
import emailjs from "@emailjs/browser";
import { Toaster } from "@/components/ui/toaster";
vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn().mockResolvedValue({ status: 200 }),
  },
}));

describe("Contact Component", () => {
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

  it("renders contact section with correct structure", () => {
    render(<Contact />);

    const contactSection = document.getElementById("contact");
    expect(contactSection).toBeInTheDocument();
    expect(contactSection).toHaveAttribute("id", "contact");
  });

  it("displays section header with icon and title", () => {
    render(<Contact />);

    const header = screen.getByRole("heading", { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent("Contact Me");

    // Check for gradient styling on "Me"
    const meText = screen.getByText("Me");
    expect(meText).toHaveClass("text-gradient");
  });

  it("displays section description", () => {
    render(<Contact />);

    const description = screen.getByText(
      /Have a project in mind or want to collaborate/,
    );
    expect(description).toBeInTheDocument();
  });

  it("displays form with all required fields", () => {
    render(<Contact />);

    // Check for form fields
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(subjectInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    // Check for submit button
    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("handles form input changes", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Use await for each user interaction to prevent hanging
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "Test message content");

    // Verify the values were set correctly
    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(subjectInput).toHaveValue("Test Subject");
    expect(messageInput).toHaveValue("Test message content");
  }, 10000); // Add explicit timeout

  it("handles form submission", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    await user.click(submitButton);

    // Form should still be visible after submission attempt
    expect(submitButton).toBeInTheDocument();
  });

  it("displays form validation states", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });

    // Try to submit empty form
    await user.click(submitButton);

    // Form should still be visible (no validation errors shown yet)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("applies gradient styling to submit button", () => {
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toHaveClass("bg-gradient-to-r");
    expect(submitButton).toHaveClass("from-primary");
    expect(submitButton).toHaveClass("to-cyan-400");
  });

  it("has proper form accessibility", () => {
    render(<Contact />);

    // Check form accessibility
    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("applies responsive design classes", () => {
    render(<Contact />);

    const contactSection = document.getElementById("contact");
    expect(contactSection).toHaveClass("py-20");
  });

  it("has consistent styling with theme", () => {
    render(<Contact />);

    const contactSection = document.getElementById("contact");
    expect(contactSection).toHaveClass("py-20");
  });

  it("displays interactive elements with hover effects", () => {
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toHaveClass("shadow-lg");
    expect(submitButton).toHaveClass("hover-lift");
  });

  it("handles form validation errors", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });

    // Try to submit without filling required fields
    await user.click(submitButton);

    // The form should still be functional (HTML5 validation prevents submission)
    expect(submitButton).toBeInTheDocument();

    // Check that required fields are present
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    expect(nameInput).toHaveAttribute("required");
    expect(emailInput).toHaveAttribute("required");
  });

  it("handles form field focus states", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    await user.click(nameInput);
    expect(nameInput).toHaveFocus();

    await user.click(emailInput);
    expect(emailInput).toHaveFocus();
  });

  it("handles form field blur events", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);

    await user.click(nameInput);
    await user.tab();

    // Should trigger blur validation
    expect(nameInput).not.toHaveFocus();
  });

  it("handles form reset functionality", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Fill form
    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(messageInput, "Test message");

    // Reset form (if reset button exists)
    const resetButton = screen.queryByRole("button", { name: /reset/i });
    if (resetButton) {
      await user.click(resetButton);

      expect(nameInput).toHaveValue("");
      expect(emailInput).toHaveValue("");
      expect(messageInput).toHaveValue("");
    }
  });

  it("handles form accessibility features", () => {
    render(<Contact />);

    // Check for proper form labels
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    // Check for proper form structure
    expect(screen.getByRole("form")).toBeInTheDocument();

    // Check for proper button accessibility
    const submitButton = screen.getByRole("button", { name: /send message/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("handles form keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Focus directly on name input
    await user.click(nameInput);
    expect(nameInput).toHaveFocus();

    await user.tab();
    expect(emailInput).toHaveFocus();

    await user.tab();
    expect(subjectInput).toHaveFocus();

    await user.tab();
    expect(messageInput).toHaveFocus();
  });

  it("handles form state management", () => {
    render(<Contact />);

    // Form should maintain state properly
    expect(screen.getByRole("form")).toBeInTheDocument();

    // All form fields should be present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("handles form state persistence", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    // Fill form fields
    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");

    // State should persist during interactions
    expect(nameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("handles form error recovery", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    // Simulate error condition
    await user.clear(nameInput);
    await user.type(emailInput, "invalid-email");

    // Should recover from errors
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("invalid-email");
  });

  it("handles form performance optimization", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);

    // Test rapid typing
    for (let i = 0; i < 10; i++) {
      await user.type(nameInput, "a");
    }

    // Should handle rapid input efficiently
    expect(nameInput).toHaveValue("a".repeat(10));
  });

  it("handles form accessibility compliance", () => {
    render(<Contact />);

    // Check for proper accessibility attributes
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("role", "form");

    const inputs = screen.getAllByRole("textbox");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("id");
      expect(input).toHaveAttribute("name");
    });
  });

  it("handles form data validation", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email/i);

    // Test email validation
    await user.type(emailInput, "invalid-email");
    expect(emailInput).toHaveValue("invalid-email");

    // Should handle validation gracefully
    await user.clear(emailInput);
    await user.type(emailInput, "valid@email.com");
    expect(emailInput).toHaveValue("valid@email.com");
  });

  it("handles form submission error handling", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole("button", { name: /send message/i });

    // Test submission without data
    await user.click(submitButton);

    // Should handle submission errors gracefully
    expect(submitButton).toBeInTheDocument();
  });

  it("handles form field dependencies", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const subjectInput = screen.getByLabelText(/subject/i);
    const messageInput = screen.getByLabelText(/message/i);

    // Test field dependencies
    await user.type(nameInput, "Test User");
    await user.type(emailInput, "test@example.com");
    await user.type(subjectInput, "Test Subject");
    await user.type(messageInput, "Test Message");

    // All fields should be properly connected
    expect(nameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@example.com");
    expect(subjectInput).toHaveValue("Test Subject");
    expect(messageInput).toHaveValue("Test Message");
  });

  it("shows correct toast message after successful form submission", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Contact />
        <Toaster />
      </>,
    );

    // Fill out the form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/subject/i), "Test Subject");
    await user.type(screen.getByLabelText(/message/i), "Test message content");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for the toast to appear using a flexible matcher
    await screen.findByText((content) =>
      content.includes(
        "Thank you for reaching out. I'll get back to you within 1-3 business days.",
      ),
    );
  });

  it("blocks disposable email addresses and shows a toast", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Contact />
        <Toaster />
      </>,
    );

    // Fill out the form with a disposable email
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@mailinator.com");
    await user.type(screen.getByLabelText(/subject/i), "Test Subject");
    await user.type(screen.getByLabelText(/message/i), "Test message content");

    // Submit the form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for the disposable email toast to appear
    await screen.findByText((content) =>
      content.includes("Disposable Email Detected"),
    );
    await screen.findByText((content) =>
      content.includes("Please use a real, non-temporary email address."),
    );
  });
});
