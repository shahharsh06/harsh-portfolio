import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CursorEffect from "./components/CursorEffect";
import ErrorBoundary from "./components/ErrorBoundary";
import React, { useEffect, useState } from "react";

const App = () => {
  const [showCursorEffect, setShowCursorEffect] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      setShowCursorEffect(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showCursorEffect && (
          <CursorEffect
            enabled={true}
            trailLength={10}
            blurAmount={6}
            circleSize={8}
            arcHeight={25}
            speed={1.2}
          />
        )}
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </ErrorBoundary>
  );
};

export default App;
