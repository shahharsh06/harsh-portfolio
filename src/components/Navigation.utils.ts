export const scrollToSection = (
  href: string,
  setIsMobileMenuOpen: (open: boolean) => void,
) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth" });
  setIsMobileMenuOpen(false);
};
