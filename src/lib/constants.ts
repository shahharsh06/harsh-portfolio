// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280,
} as const;

// Carousel intervals (in milliseconds)
export const CAROUSEL_INTERVALS = {
  FEATURED: 3000,
  OTHER: 2500,
} as const;

// Responsive visibility counts
export const getVisibleCount = (type: "featured" | "other") => {
  if (typeof window === "undefined") return 1;
  if (window.innerWidth >= BREAKPOINTS.TABLET)
    return type === "featured" ? 2 : 3;
  if (window.innerWidth >= BREAKPOINTS.MOBILE) return 1;
  return 1;
};

// Coverflow configuration
export const COVERFLOW_CONFIG = {
  CENTER_SCALE: 1,
  SIDE_SCALE: 0.85,
  ANGLE: 30,
  TRANSLATE_X: 40,
  SIDE_OPACITY: 0.7,
  FAR_OPACITY: 0.3,
  FAR_SCALE: 0.7,
  FAR_TRANSLATE: 60,
} as const;

// Animation durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Personal Information
export const PERSONAL_INFO = {
  name: "Harsh Shah",
  email: "shahharsh06.jobs@gmail.com",
  location: "College Station, Texas, USA",
  title: "ML & Software Engineer",
  github: "shahharsh06",
  linkedin: "shahharsh06",
} as const;

// Social Links
export const SOCIAL_LINKS = {
  github: `https://github.com/${PERSONAL_INFO.github}`,
  linkedin: `https://www.linkedin.com/in/${PERSONAL_INFO.linkedin}/`,
  email: `mailto:${PERSONAL_INFO.email}`,
} as const;
