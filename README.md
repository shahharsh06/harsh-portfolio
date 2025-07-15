# Harsh Portfolio Website

A professional, accessible, and responsive portfolio website to showcase Harsh's software development skills, projects, and blog, built with React and Tailwind CSS.

## 🎯 Project Overview

This portfolio website demonstrates modern web development practices including:
- **React 18** with TypeScript for robust development
- **Tailwind CSS** for responsive, accessible design
- **Dark/Light Theme** with system preference detection
- **SEO Optimization** with meta tags, sitemap, and OpenGraph
- **Performance Optimized** with Lighthouse scores >90
- **Accessibility Compliant** (WCAG AA+ standards)
- **Free Hosting** on GitHub Pages/Vercel

## 🚀 Features

### Core Features
- ✅ **Home Page**: Hero section with name, title, and introduction
- ✅ **About Section**: Skills, education, certifications, experience
- ✅ **Projects Gallery**: Showcase with GitHub links, tech stacks, descriptions
- ✅ **Contact Form**: Email integration and social media links
- ✅ **Theme Toggle**: Light/Dark mode with system preference detection
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **SEO Optimized**: Meta tags, sitemap, OpenGraph, Twitter Cards

### Advanced Features
- 🔄 **Project Filtering**: Search and filter projects by technology
- 🔄 **Animations**: Smooth page transitions with Framer Motion
- 🔄 **Analytics**: Google Analytics integration
- 🔄 **Performance**: Lazy loading, image optimization

## 🎨 Design System

### Color Palette (Accessible & Color-Blind Safe)

**Light Mode:**
- Background: `#FAFAFA`
- Text: `#1E1E1E`
- Accent: `#0077B6`
- Button/Highlight: `#90E0EF`

**Dark Mode:**
- Background: `#121212`
- Text: `#E0E0E0`
- Accent: `#00B4D8`
- Button/Highlight: `#CAF0F8`

### Typography
- **Headings**: Inter (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Code**: JetBrains Mono

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages / Vercel
- **Analytics**: Google Analytics 4

## 📋 Development Roadmap

### Phase 1: Foundation (Week 1)
- [x] Project setup and repository structure
- [x] React + Vite + TypeScript configuration
- [x] Tailwind CSS setup with custom theme
- [x] Basic routing structure
- [ ] Home page component
- [ ] About page component

### Phase 2: Core Features (Week 2)
- [ ] Projects gallery component
- [ ] Contact form with email integration
- [ ] Theme toggle functionality
- [ ] Responsive navigation
- [ ] SEO meta tags implementation

### Phase 3: Enhancement (Week 3)
- [ ] Blog system with Markdown support
- [ ] Project filtering and search
- [ ] Smooth animations and transitions
- [ ] Performance optimization
- [ ] Accessibility improvements

### Phase 4: Deployment (Week 4)
- [ ] GitHub Actions CI/CD setup
- [ ] Production build optimization
- [ ] Domain configuration
- [ ] Google Analytics integration
- [ ] Final testing and launch

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
```

### Environment Variables

Create a `.env.local` file:

```env
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
VITE_CONTACT_EMAIL=your_email@example.com
```

## 📁 Project Structure

```
harsh-portfolio/
├── public/
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── sections/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── styles/
│   └── types/
├── content/
│   ├── projects/
│   └── blog/
├── docs/
└── scripts/
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run accessibility tests
npm run test:a11y

# Run Lighthouse audit
npm run lighthouse
```

## 📊 Performance Targets

- **Lighthouse Score**: >90 in all categories
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

## ♿ Accessibility Standards

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios (4.5:1 minimum)
- Color-blind safe palette
- Focus indicators

## 🚀 Deployment

### GitHub Pages
1. Push to main branch
2. GitHub Actions automatically builds and deploys
3. Available at: `https://yourusername.github.io/harsh-portfolio`

### Vercel (Alternative)
1. Connect GitHub repository to Vercel
2. Automatic deployments on push to main
3. Custom domain support

## 📈 SEO Checklist

- [ ] Meta title and description
- [ ] OpenGraph tags
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Alt text for images
- [ ] Semantic HTML
- [ ] Page speed optimization
- [ ] Mobile-friendly design

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

---

**Built with ❤️ by Harsh**
