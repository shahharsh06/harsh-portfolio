# Harsh Portfolio Website

A professional, accessible, and responsive portfolio website showcasing Harsh's software development skills, projects, and experience. Built with React 18, TypeScript, and Tailwind CSS with modern development practices and optimized performance.

## 🎯 Project Overview

This portfolio website demonstrates modern web development practices including:
- **React 18** with TypeScript for robust development
- **Tailwind CSS** for responsive, accessible design with custom gradients
- **Dark/Light Theme** with system preference detection
- **Performance Optimized** with lazy loading and efficient components
- **Accessibility Compliant** (WCAG AA+ standards)
- **Modern UI/UX** with smooth animations and interactive elements

## 🚀 Features

### Core Features
- ✅ **Hero Section**: Animated typewriter effect with gradient styling
- ✅ **About Section**: Skills, education, certifications, and experience
- ✅ **Projects Gallery**: Interactive showcase with filtering and carousel
- ✅ **Contact Form**: Frontend form with validation (backend integration pending)
- ✅ **Theme Toggle**: Light/Dark mode with system preference detection
- ✅ **Responsive Design**: Mobile-first approach with breakpoint optimization
- ✅ **GitHub Integration**: Repository connected and deployed

### Advanced Features
- ✅ **Interactive Components**: Hover effects, animations, and micro-interactions
- ✅ **Gradient Consistency**: Unified blue-to-cyan gradient across all UI elements
- ✅ **Reusable Components**: Modular design with shared UI components
- ✅ **Data Separation**: Centralized constants and external data files
- ✅ **Type Safety**: Full TypeScript implementation with proper interfaces
- ✅ **Performance**: Optimized bundle size and efficient rendering

### Planned Features
- 🔄 **SEO Optimization**: Meta tags, OpenGraph, and structured data
- 🔄 **Contact Form Backend**: Email integration and form processing
- 🔄 **Testing Pipeline**: Unit tests, integration tests, and CI/CD
- 🔄 **Analytics**: Google Analytics integration
- 🔄 **Performance Monitoring**: Lighthouse CI and performance tracking

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

## 🛠️ Tech Stack

### Frontend
- **React 18** + TypeScript for type-safe development
- **Tailwind CSS** + CSS Modules for styling
- **Framer Motion** for smooth animations
- **React Router DOM** for client-side routing
- **Lucide React** for consistent iconography

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

```
harsh-portfolio/
├── public/
│   ├── placeholder.svg
│   ├── robot.txt
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── profile/
│   │   │   └── harsh_profile_image.jpg
│   │   └── resume/
│   │       └── Harsh_SE_Resume.pdf
│   ├── components/
│   │   ├── ui/                    # Reusable UI components
│   │   │   ├── GradientButton.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   ├── InteractiveCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── SkillTag.tsx
│   │   ├── icons/                 # Custom icon components
│   │   │   ├── EnvelopeIcon.tsx
│   │   │   ├── GithubIcon.tsx
│   │   │   ├── LinkedinIcon.tsx
│   │   │   └── index.ts
│   │   ├── About.tsx
│   │   ├── CareerEducation.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── data/                      # External data files
│   │   ├── projects.ts
│   │   └── timeline.ts
│   ├── hooks/                     # Custom React hooks
│   │   ├── useCarousel.ts
│   │   ├── useResponsive.ts
│   │   └── use-toast.ts
│   ├── lib/                       # Utilities and constants
│   │   ├── constants.ts
│   │   └── utils.ts
│   ├── pages/                     # Page components
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── components.json                # shadcn/ui configuration
├── tailwind.config.ts            # Tailwind configuration
├── vite.config.ts                # Vite configuration
└── package.json
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

### Environment Variables

Create a `.env.local` file for any environment-specific configurations:

```env
# Future: Add environment variables for:
# VITE_GOOGLE_ANALYTICS_ID=your_ga_id
# VITE_CONTACT_EMAIL=your_email@example.com
# VITE_CONTACT_API_ENDPOINT=your_api_endpoint
```

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

## 🧪 Testing (Planned)

```bash
# Future testing commands:
# npm run test          # Unit tests
# npm run test:e2e      # End-to-end tests
# npm run test:a11y     # Accessibility tests
# npm run lighthouse    # Performance audit
```

## 🔄 Development Roadmap

### Phase 1: Foundation ✅
- [x] Project setup and repository structure
- [x] React + Vite + TypeScript configuration
- [x] Tailwind CSS setup with custom theme
- [x] Basic routing structure
- [x] Core components (Hero, About, Projects, Contact)
- [x] Theme toggle functionality
- [x] Responsive navigation

### Phase 2: Enhancement 🔄
- [ ] SEO optimization (meta tags, OpenGraph)
- [ ] Contact form backend integration
- [ ] Google Analytics integration
- [ ] Performance monitoring
- [ ] Testing pipeline setup

### Phase 3: Advanced Features 📋
- [ ] Blog system with Markdown support
- [ ] Advanced project filtering
- [ ] Performance optimization
- [ ] CI/CD pipeline
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

*ML & Software Engineer | Texas A&M University*
