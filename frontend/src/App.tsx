import './lib/i18n';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import AboutSection from './components/sections/AboutSection';
import SoftwareSection from './components/sections/SoftwareSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="pt-16">
          <Hero />
          <AboutSection />
          <SoftwareSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App; 