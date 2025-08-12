import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../ErrorBoundary";

function ThrowOnRender() {
  throw new Error("Boom");
}

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders default fallback UI when a child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(/Please try refreshing the page/i),
    ).toBeInTheDocument();
  });

  it("supports custom fallback prop", () => {
    render(
      <ErrorBoundary fallback={<div role="alert">Custom Fallback</div>}>
        <ThrowOnRender />
      </ErrorBoundary>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Custom Fallback");
  });

  it("refresh button calls window.location.reload", async () => {
    const user = userEvent.setup();

    const originalReload = window.location.reload;
    const reloadMock = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...window.location, reload: reloadMock },
    });

    render(
      <ErrorBoundary>
        <ThrowOnRender />
      </ErrorBoundary>,
    );

    const button = screen.getByRole("button", { name: /refresh page/i });
    await user.click(button);

    expect(reloadMock).toHaveBeenCalledTimes(1);

    // restore
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...window.location, reload: originalReload },
    });
  });
});
