import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CareerEducation from '../components/CareerEducation';
import { MobileMenuProvider } from "@/components/MobileMenuContext";
import { useMobileMenu } from "@/components/MobileMenuContext.utils";

const MainContent = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useMobileMenu();

  const handleContentClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div 
        className={`transition-all duration-300 ${
          isMobileMenuOpen ? 'blur-sm' : ''
        }`}
        onClick={handleContentClick}
      >
      <Hero />
      <About />
      <CareerEducation />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <MobileMenuProvider>
    <MainContent />
    </MobileMenuProvider>
  );
};

export default Index;