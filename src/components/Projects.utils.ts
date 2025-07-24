// Utility functions for Projects
export const scrollToFeatured = (direction: 'prev' | 'next', prevFeatured: () => void, nextFeatured: () => void) => {
  if (direction === 'prev') {
    prevFeatured();
  } else {
    nextFeatured();
  }
};

export const scrollToOther = (direction: 'prev' | 'next', prevOther: () => void, nextOther: () => void) => {
  if (direction === 'prev') {
    prevOther();
  } else {
    nextOther();
  }
};

export const scrollToFeaturedMobile = (direction: 'prev' | 'next', prevFeaturedMobile: () => void, nextFeaturedMobile: () => void) => {
  if (direction === 'prev') {
    prevFeaturedMobile();
  } else {
    nextFeaturedMobile();
  }
};

export const scrollToOtherMobile = (direction: 'prev' | 'next', prevOtherMobile: () => void, nextOtherMobile: () => void) => {
  if (direction === 'prev') {
    prevOtherMobile();
  } else {
    nextOtherMobile();
  }
};

export const handleFeaturedHover = (
  isHovered: boolean,
  setIsFeaturedHovered: (hovered: boolean) => void,
  pauseFeatured: () => void,
  pauseFeaturedMobile: () => void,
  resumeFeatured: () => void,
  resumeFeaturedMobile: () => void
) => {
  setIsFeaturedHovered(isHovered);
  if (isHovered) {
    pauseFeatured();
    pauseFeaturedMobile();
  } else {
    resumeFeatured();
    resumeFeaturedMobile();
  }
};

export const handleOtherHover = (
  isHovered: boolean,
  setIsOtherHovered: (hovered: boolean) => void,
  pauseOther: () => void,
  pauseOtherMobile: () => void,
  resumeOther: () => void,
  resumeOtherMobile: () => void
) => {
  setIsOtherHovered(isHovered);
  if (isHovered) {
    pauseOther();
    pauseOtherMobile();
  } else {
    resumeOther();
    resumeOtherMobile();
  }
}; 