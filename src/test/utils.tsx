import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AllTheProviders } from "./providers";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
