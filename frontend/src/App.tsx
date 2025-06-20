import './lib/i18n';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Layout from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { AboutSection } from './components/sections/AboutSection';
import { SoftwareSection } from './components/sections/SoftwareSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <main className="pt-16">
          <Hero />
          <AboutSection />
          <SoftwareSection />
          <FeaturesSection />
          <ContactSection />
        </main>
      </Layout>
    </ThemeProvider>
  );
}

export default App; 