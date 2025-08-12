// Utility functions for Projects

// Interfaces to reduce parameter counts and improve type safety
interface HoverHandlerConfig {
  setHovered: (hovered: boolean) => void;
  pause: () => void;
  pauseMobile: () => void;
  resume: () => void;
  resumeMobile: () => void;
}

interface ScrollHandlerConfig {
  prev: () => void;
  next: () => void;
}

// Generic scroll function that can handle any direction and functions
export const scrollTo = (
  direction: "prev" | "next",
  handlers: ScrollHandlerConfig,
) => {
  if (direction === "prev") {
    handlers.prev();
  } else {
    handlers.next();
  }
};

// Generic hover handler that can work with any set of pause/resume functions
export const handleHover = (isHovered: boolean, config: HoverHandlerConfig) => {
  config.setHovered(isHovered);
  if (isHovered) {
    config.pause();
    config.pauseMobile();
  } else {
    config.resume();
    config.resumeMobile();
  }
};

// Specific implementations using the generic functions with reduced parameters
export const scrollToFeatured = (
  direction: "prev" | "next",
  handlers: ScrollHandlerConfig,
) => scrollTo(direction, handlers);

export const scrollToOther = (
  direction: "prev" | "next",
  handlers: ScrollHandlerConfig,
) => scrollTo(direction, handlers);

export const scrollToFeaturedMobile = (
  direction: "prev" | "next",
  handlers: ScrollHandlerConfig,
) => scrollTo(direction, handlers);

export const scrollToOtherMobile = (
  direction: "prev" | "next",
  handlers: ScrollHandlerConfig,
) => scrollTo(direction, handlers);

// Hover handlers with reduced parameters using the interface
export const handleFeaturedHover = (
  isHovered: boolean,
  config: HoverHandlerConfig,
) => handleHover(isHovered, config);

export const handleOtherHover = (
  isHovered: boolean,
  config: HoverHandlerConfig,
) => handleHover(isHovered, config);

// Alternative: If you prefer to keep the original function signatures for backward compatibility,
// you can create wrapper functions that construct the config objects
export const createFeaturedHoverConfig = (
  setIsFeaturedHovered: (hovered: boolean) => void,
  pauseFeatured: () => void,
  pauseFeaturedMobile: () => void,
  resumeFeatured: () => void,
  resumeFeaturedMobile: () => void,
): HoverHandlerConfig => ({
  setHovered: setIsFeaturedHovered,
  pause: pauseFeatured,
  pauseMobile: pauseFeaturedMobile,
  resume: resumeFeatured,
  resumeMobile: resumeFeaturedMobile,
});

export const createOtherHoverConfig = (
  setIsOtherHovered: (hovered: boolean) => void,
  pauseOther: () => void,
  pauseOtherMobile: () => void,
  resumeOther: () => void,
  resumeOtherMobile: () => void,
): HoverHandlerConfig => ({
  setHovered: setIsOtherHovered,
  pause: pauseOther,
  pauseMobile: pauseOtherMobile,
  resume: resumeOther,
  resumeMobile: resumeOtherMobile,
});
