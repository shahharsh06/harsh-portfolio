# Harsh Shah - ML Engineer & Software Engineer Portfolio

![Test Coverage](https://img.shields.io/badge/coverage-94.69%25-red?logo=vitesthttps://img.shields.io/badge/coverage-94.69%25-brightgreen?logo=viteststyle=flat&style=flat)
![Function Coverage](https://img.shields.io/badge/functions-84.7%25-green?logo=typescript&style=flat)
![Tests Passing](https://img.shields.io/badge/tests-375%20passing-brightgreen?logo=vitest&style=flat)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github&style=flat)

A professional, accessible, and responsive portfolio website showcasing software development skills, projects, and experience. Built with React 18, TypeScript, and Tailwind CSS with modern development practices and optimized performance.

> ⭐ **If you find this portfolio helpful, please give it a star!** ⭐

## 📁 Project Structure
```bash
harsh-portfolio/
├── public/
│   ├── dashboard.html            # Portfolio Dashboard
│   ├── dashboard.js              # Dashboard JavaScript
│   ├── dashboard-data.json       # Dashboard metrics (auto-generated)
│   ├── 404.html                  # 404 error page
│   └── robot.txt                 # Robots file
├── src/
│   ├── __tests__/                # Integration tests
│   │   └── App.integration.test.tsx
│   ├── assets/                   # Static assets
│   │   ├── profile/
│   │   │   └── profile_image.jpg
│   │   └── resume/
│   │       └── resume.pdf
│   ├── components/               # React components
│   │   ├── __tests__/            # Component tests
│   │   │   ├── About.test.tsx
│   │   │   ├── Contact.test.tsx
│   │   │   ├── Hero.test.tsx
│   │   │   ├── Navigation.test.tsx
│   │   │   ├── Projects.test.tsx
│   │   │   ├── Projects.unit.test.tsx
│   │   │   └── Navigation.unit.test.tsx
│   │   ├── ui/                   # Reusable UI components
│   │   │   ├── __tests__/        # UI component tests
│   │   │   │   ├── GradientButton.test.tsx
│   │   │   │   ├── InteractiveCard.test.tsx
│   │   │   │   ├── ProjectCard.test.tsx
│   │   │   │   └── SkillTag.test.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── GradientButton.tsx
│   │   │   ├── input.tsx
│   │   │   ├── InteractiveCard.tsx
│   │   │   ├── label.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── SkillTag.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── toaster.tsx
│   │   │   └── tooltip.tsx
│   │   ├── icons/                # Custom icon components
│   │   │   ├── DashboardIcon.tsx
│   │   │   ├── EnvelopeIcon.tsx
│   │   │   ├── GithubIcon.tsx
│   │   │   ├── LinkedinIcon.tsx
│   │   │   └── index.ts
│   │   ├── About.tsx
│   │   ├── CareerEducation.tsx
│   │   ├── Contact.tsx           # Contact form with validation and EmailJS
│   │   ├── CursorEffect.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MobileMenuContext.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx           # 'Other Projects' section is commented out for now
│   │   ├── SectionIcon.tsx
│   │   ├── Skills.tsx
│   │   ├── ThemeProvider.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/                     # External data files
│   │   ├── projects.ts
│   │   └── timeline.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── __tests__/            # Hook tests
│   │   │   ├── useCarousel.test.ts
│   │   │   └── useResponsive.test.ts
│   │   ├── use-toast.ts
│   │   ├── useCarousel.ts
│   │   └── useResponsive.ts
│   ├── lib/                      # Utilities and constants
│   │   ├── __tests__/            # Library tests
│   │   │   ├── constants.test.ts
│   │   │   └── utils.test.ts
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── pages/                    # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── test/                     # Test utilities
│   │   ├── setup.ts
│   │   └── utils.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env                          # EmailJS keys (not committed)
├── .github/                      # GitHub Actions and workflows
├── coverage/                     # Test coverage reports
├── dist/                         # Production build output
├── node_modules/                 # Dependencies
├── ... (other config and doc files)
```

## 🚀 Features
- **Hero Section**: Animated typewriter effect with gradient styling
- **About Section**: Skills, education, certifications, and experience
- **Projects Gallery**: Interactive showcase with filtering and carousel
- **Contact Form**: Frontend form with validation (email format, disposable email detection) and EmailJS integration (no backend required)
- **Theme Toggle**: Light/Dark mode with system preference detection
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Portfolio Dashboard**: Test coverage and code quality metrics, auto-updated via CI/CD
- **Comprehensive Testing**: 375+ tests, 94.69% coverage, 84.7% function coverage

## 🧪 Testing & Coverage
- **Statements:** 94.69%
- **Branches:** 92.61%
- **Functions:** 84.7%
- **Lines:** 94.69%
- **Tests:** 375+ passing
- **Highlights:**
  - Unit tests for internal logic (navigation, project handlers)
  - Edge case and negative path tests for all major utilities
  - Tests for 'Other Projects' are commented out to match the UI
  - EmailJS is mocked in tests to avoid using up credits

## 📊 Dashboard
- **URL:** `/harsh-portfolio/dashboard.html`
- **Metrics:** Coverage and test numbers match the latest run
- **Testing:** Dashboard link is now found by `href` in tests, not by accessible name
- **Auto-updates:** Dashboard reflects the latest metrics after each CI/CD run
- **Note:** 'Other Projects' section is temporarily hidden in the UI and tests

## 🎨 Design System
- **Color Palette:** Accessible, color-blind safe, light/dark mode
- **Typography:** Inter (Google Fonts), JetBrains Mono for code
- **Component Library:** GradientButton, SectionHeader, InteractiveCard, ProjectCard, SkillTag, Dashboard Cards

## 🛠️ Tech Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Framer Motion, React Router DOM, Lucide React
- **Dashboard:** Chart.js, Lucide React, Tailwind CSS, CSS Variables
- **Build & Development:** Vite, ESLint, PostCSS, SWC
- **UI Components:** Radix UI, Class Variance Authority, Tailwind Merge, Sonner
- **State Management:** React Context API, React Hook Form, Zod

## 🔄 Development Roadmap
- [x] Project setup, core components, theme toggle, responsive navigation
- [x] Testing pipeline, dashboard, chart integration, contact form integration
- [x] Portfolio Dashboard with metrics, auto-updated via CI/CD
- [ ] SEO optimization, Google Analytics, performance monitoring
- [ ] Advanced project filtering, E2E testing, accessibility testing
- [ ] Final testing and launch

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Vite](https://vitejs.dev/) for the build tool
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for component inspiration

---

**Built with ❤️ by Harsh Shah**

*ML & Software Engineer*

> ⭐ **If you found this portfolio helpful, please give it a star!** ⭐
