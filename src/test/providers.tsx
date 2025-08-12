import React from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BrowserRouter } from "react-router-dom";

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <BrowserRouter>
    <ThemeProvider>{children}</ThemeProvider>
  </BrowserRouter>
);
