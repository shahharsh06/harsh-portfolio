# Harsh Shah - ML Engineer & Full Stack Developer Portfolio

![Test Coverage](https://img.shields.io/badge/coverage-91.72%25-red?logo=vitesthttps://img.shields.io/badge/coverage-91.72%25-brightgreen?logo=viteststyle=flat&style=flat)
![Function Coverage](https://img.shields.io/badge/functions-74.35%25-green?logo=typescript&style=flat)
![Tests Passing](https://img.shields.io/badge/tests-352%20passing-brightgreen?logo=vitest&style=flat)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen?logo=github&style=flat)

A professional, accessible, and responsive portfolio website showcasing software development skills, projects, and experience. Built with React 18, TypeScript, and Tailwind CSS with modern development practices and optimized performance.

> ⭐ **If you find this portfolio helpful, please give it a star!** ⭐

## 🎯 Project Overview

This portfolio website demonstrates modern web development practices including:
- **React 18** with TypeScript for robust development
- **Tailwind CSS** for responsive, accessible design with custom gradients
- **Dark/Light Theme** with system preference detection
- **Performance Optimized** with lazy loading and efficient components
- **Accessibility Compliant** (WCAG AA+ standards)
- **Modern UI/UX** with smooth animations and interactive elements
- **Portfolio Dashboard** with test coverage and code quality metrics
- **Comprehensive Testing** with 91.72% coverage and 352 passing tests

## 🚀 Features

### Core Features
- ✅ **Hero Section**: Animated typewriter effect with gradient styling
- ✅ **About Section**: Skills, education, certifications, and experience
- ✅ **Projects Gallery**: Interactive showcase with filtering and carousel
- ✅ **Contact Form**: Frontend form with validation (backend integration pending)
- ✅ **Theme Toggle**: Light/Dark mode with system preference detection
- ✅ **Responsive Design**: Mobile-first approach with breakpoint optimization
- ✅ **GitHub Integration**: Repository connected and deployed
- ✅ **Portfolio Dashboard**: Test coverage and code quality metrics

### Advanced Features
- ✅ **Interactive Components**: Hover effects, animations, and micro-interactions
- ✅ **Gradient Consistency**: Unified blue-to-cyan gradient across all UI elements
- ✅ **Reusable Components**: Modular design with shared UI components
- ✅ **Data Separation**: Centralized constants and external data files
- ✅ **Type Safety**: Full TypeScript implementation with proper interfaces
- ✅ **Performance**: Optimized bundle size and efficient rendering
- ✅ **Dashboard Analytics**: Coverage tracking with Chart.js visualizations
- ✅ **Comprehensive Testing**: 352 tests with 91.72% coverage

### Planned Features
- 🔄 **SEO Optimization**: Meta tags, OpenGraph, and structured data
- 🔄 **Contact Form Backend**: Email integration and form processing
- 🔄 **Analytics**: Google Analytics integration
- 🔄 **Performance Monitoring**: Lighthouse CI and performance tracking
- 🔄 **Real-time Dashboard**: Live coverage updates and metrics

## 📊 Portfolio Dashboard

### Dashboard Features
- ✅ **Coverage Metrics**: Test coverage metrics (91.72%)
- ✅ **Code Quality Metrics**: TypeScript coverage, linting scores, and security analysis
- ✅ **Test Categories**: Component, UI, Utility, Integration, and Hook tests breakdown
- ✅ **CI/CD Status**: Pipeline status with visual indicators
- ✅ **Interactive Charts**: Chart.js doughnut and line charts for data visualization
- ✅ **Theme Integration**: Seamless light/dark theme switching
- ✅ **Responsive Design**: Mobile-optimized dashboard layout
- ✅ **Lucide React Icons**: Consistent iconography matching portfolio design

### Dashboard Metrics
- **Overall Coverage**: 91.72% (Target: 80%)
- **Total Tests**: 352 tests (All passing)
- **Function Coverage**: 74.35% (Target: 65%)
- **Code Quality**: A+ grade
- **Security Score**: 95% (No high severity issues)
- **Component Coverage**: 8 components with 90%+ coverage
- **Test Categories**: 5 categories with detailed breakdowns

### Dashboard Access
- **URL**: `/harsh-portfolio/dashboard.html`
- **Navigation**: Accessible via portfolio navigation
- **Theme Sync**: Matches portfolio theme preferences

### Dashboard Status
- ✅ **UI/UX**: Complete with responsive design and theme integration
- ✅ **Charts**: Chart.js visualizations implemented
- ✅ **Icons**: Lucide React icons consistent with portfolio
- 🔄 **Real-time Updates**: Planned for future implementation
- 🔄 **Auto-refresh**: Manual refresh required
- 🔄 **Live Data**: Static data display (needs API integration)

## 🎨 Design System

### Color Palette (Accessible & Color-Blind Safe)

**Light Mode:**
- Background: `#FAFAFA`
- Text: `#1E1E1E`
- Primary: `#0077B6` (Blue)
- Secondary: `#00B4D8` (Cyan)
- Gradient: `from-primary to-cyan-400`

**Dark Mode:**
- Background: `#121212`
- Text: `#E0E0E0`
- Primary: `#00B4D8`
- Secondary: `#CAF0F8`
- Gradient: `from-primary to-cyan-400`

### Typography
- **Headings**: Inter (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono

### Component Library
- **GradientButton**: Reusable button with consistent gradient styling
- **SectionHeader**: Standardized section headers with icons
- **InteractiveCard**: Hover-animated cards for content display
- **ProjectCard**: Specialized cards for project showcases
- **SkillTag**: Tag components for skills and technologies
- **Dashboard Cards**: Consistent metric cards with Lucide React icons

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript for type-safe development
- **Tailwind CSS** + CSS Modules for styling
- **Framer Motion** for smooth animations
- **React Router DOM** for client-side routing
- **Lucide React** for consistent iconography

### Dashboard
- **Chart.js** for data visualization
- **Lucide React** for dashboard icons
- **Tailwind CSS** for responsive layout
- **CSS Variables** for theme integration

### Build & Development
- **Vite** for fast development and optimized builds
- **ESLint** + TypeScript for code quality
- **PostCSS** + Autoprefixer for CSS processing
- **SWC** for fast compilation

### UI Components
- **Radix UI** primitives for accessible components
- **Class Variance Authority** for component variants
- **Tailwind Merge** for class name optimization
- **Sonner** for toast notifications

### State Management
- **React Context API** for global state (theme, mobile menu)
- **React Hook Form** for form management
- **Zod** for schema validation

## 📁 Project Structure

```bash
harsh-portfolio/
├── .github/                       # GitHub Actions and workflows
├── .dist/                         # Build output (alternative)
├── coverage/                      # Test coverage reports
│   ├── lcov-report/              # HTML coverage reports
│   ├── src/                      # Source coverage data
│   ├── coverage-final.json       # Coverage data
│   ├── index.html                # Coverage dashboard
│   └── lcov.info                 # Coverage info
├── dist/                         # Production build output
├── node_modules/                 # Dependencies
├── public/                       # Static assets
│   ├── dashboard.html            # Portfolio Dashboard
│   ├── dashboard.js              # Dashboard JavaScript
│   ├── 404.html                  # 404 error page
│   └── robot.txt                 # Robots file
├── src/                          # Source code
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
│   │   │   └── Projects.test.tsx
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
│   │   ├── Contact.tsx
│   │   ├── CursorEffect.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── MobileMenuContext.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
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
├── .gitignore                    # Git ignore rules
├── CI-CD-SETUP.md               # CI/CD setup documentation
├── DASHBOARD-SETUP.md           # Dashboard setup guide
├── GITHUB-PAGES-SETUP.md        # GitHub Pages deployment guide
├── LIVE-SITE-TESTING.md         # Live site testing guide
├── VERCEL-MIGRATION.md          # Vercel migration guide
├── components.json              # shadcn/ui configuration
├── coverage-badge.config.js     # Coverage badge configuration
├── coverage-summary.md          # Coverage summary report
├── eslint.config.js             # ESLint configuration
├── index.html                   # Main HTML file
├── LICENSE                      # MIT License
├── package-lock.json            # Dependency lock file
├── package.json                 # Project dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Project documentation
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.app.json            # TypeScript app configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript node configuration
├── vite.config.ts               # Vite build configuration
└── vitest.config.ts             # Vitest testing configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/shahharsh06/harsh-portfolio.git
cd harsh-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

<details>
<summary>📋 Copy Installation Commands</summary>

```bash
git clone https://github.com/shahharsh06/harsh-portfolio.git
cd harsh-portfolio
npm install
npm run dev
```

</details>

### Environment Variables

Create a `.env.local` file for any environment-specific configurations:

```env
# Future: Add environment variables for:
# VITE_GOOGLE_ANALYTICS_ID=your_ga_id
# VITE_CONTACT_EMAIL=your_email@example.com
# VITE_CONTACT_API_ENDPOINT=your_api_endpoint
```

<details>
<summary>📋 Copy Environment Template</summary>

```env
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_CONTACT_EMAIL=your_email@example.com
VITE_CONTACT_API_ENDPOINT=your_api_endpoint
```

</details>

## 🎯 Key Improvements

### Code Organization
- **Centralized Constants**: Personal info and social links in `src/lib/constants.ts`
- **Data Separation**: Timeline and projects data in separate files
- **Reusable Components**: Modular UI components for consistency
- **Type Safety**: Full TypeScript implementation with proper interfaces

### UI/UX Enhancements
- **Gradient Consistency**: Unified blue-to-cyan gradient across all components
- **Interactive Elements**: Hover effects, animations, and micro-interactions
- **Responsive Design**: Mobile-first approach with optimized breakpoints
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### Performance Optimizations
- **Bundle Size**: Removed 47 unnecessary files and unused dependencies
- **Lazy Loading**: Efficient component loading and rendering
- **Code Splitting**: Optimized imports and dependencies
- **Build Optimization**: Vite configuration for fast builds

## 📊 Performance Metrics

- **Lighthouse Score**: >90 in all categories (target)
- **First Contentful Paint**: <1.5s (target)
- **Largest Contentful Paint**: <2.5s (target)
- **Cumulative Layout Shift**: <0.1 (target)
- **First Input Delay**: <100ms (target)
- **Bundle Size**: Optimized with tree-shaking and code splitting

## ♿ Accessibility Standards

- **WCAG 2.1 AA** compliance
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast ratios** (4.5:1 minimum)
- **Color-blind safe** palette
- **Focus indicators** and proper ARIA labels
- **Semantic HTML** structure

## 🚀 Deployment

### GitHub Pages
1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. Available at: `https://shahharsh06.github.io/harsh-portfolio`

<details>
<summary>📋 Copy GitHub Pages URL</summary>

```
https://shahharsh06.github.io/harsh-portfolio
```

</details>

### Vercel (Alternative)
1. Connect GitHub repository to Vercel
2. Automatic deployments on push to main
3. Custom domain support

## 📈 SEO Features (Planned)

- 🔄 Meta title and description
- 🔄 OpenGraph tags
- 🔄 Twitter Card tags
- 🔄 Structured data (JSON-LD)
- 🔄 Sitemap.xml
- 🔄 Robots.txt
- ✅ Alt text for images
- ✅ Semantic HTML structure
- ✅ Page speed optimization
- ✅ Mobile-friendly design

## 🧪 Testing

```bash
# Run all tests
npm run test:run

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test

# Run specific test file
npm run test -- src/components/__tests__/Hero.test.tsx
```

<details>
<summary>📋 Copy Test Commands</summary>

```bash
npm run test:run
npm run test:coverage
npm run test
```

</details>

### Test Coverage: 96.5% ✅

- **381 tests passing** across all components
- **Component Tests**: 95+ tests covering all major components
- **UI Tests**: 73+ tests for reusable UI components  
- **Integration Tests**: 16+ tests for component interactions
- **Utility Tests**: 27+ tests for helper functions
- **Hook Tests**: 26+ tests for custom React hooks
- **Function Coverage**: 82.71% (exceeds 65% threshold)

### Test Categories
- ✅ **Unit Tests**: All components and utilities
- ✅ **Integration Tests**: Component interactions and user flows
- ✅ **Coverage Dashboard**: Coverage tracking
- 🔄 **E2E Tests**: Planned with Playwright
- 🔄 **Accessibility Tests**: Planned for WCAG compliance

### Dashboard Integration
- ✅ **Coverage Display**: Test coverage metrics display
- ✅ **Test Breakdown**: Detailed test category metrics
- ✅ **Quality Metrics**: TypeScript, linting, and security scores
- ✅ **CI/CD Status**: Pipeline status with visual indicators
- ✅ **Chart Visualizations**: Coverage trends and breakdowns
- 🔄 **Real-time Updates**: Planned for future implementation
- 🔄 **Live Data**: Currently static data (needs API)

## 🔄 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and repository structure
- [x] React + Vite + TypeScript configuration
- [x] Tailwind CSS setup with custom theme
- [x] Basic routing structure
- [x] Core components (Hero, About, Projects, Contact)
- [x] Theme toggle functionality
- [x] Responsive navigation

### Phase 2: Enhancement ✅
- [x] Testing pipeline setup (96.5% coverage achieved)
- [x] Portfolio Dashboard with metrics
- [x] Chart.js integration for data visualization
- [x] Lucide React icon consistency
- [x] Dashboard theme integration
- [ ] SEO optimization (meta tags, OpenGraph)
- [ ] Contact form backend integration
- [ ] Google Analytics integration
- [ ] Performance monitoring

### Phase 3: Advanced Features 📋
- [ ] Blog system with Markdown support
- [ ] Advanced project filtering
- [ ] Performance optimization
- [ ] CI/CD pipeline automation
- [ ] E2E testing with Playwright
- [ ] Accessibility testing for WCAG compliance
- [ ] Real-time dashboard updates
- [ ] Final testing and launch

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<details>
<summary>📋 Copy Contributing Commands</summary>

```bash
git checkout -b feature/amazing-feature
git commit -m 'Add amazing feature'
git push origin feature/amazing-feature
```

</details>

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

*ML & Software Engineer | Texas A&M University*

> ⭐ **If you found this portfolio helpful, please give it a star!** ⭐
