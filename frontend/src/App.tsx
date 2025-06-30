import './lib/i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/providers/ThemeProvider';
import Layout from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { AboutSection } from './components/sections/AboutSection';
import { SoftwareSection } from './components/sections/SoftwareSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import ContactSection from './components/sections/ContactSection';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

function HomePage() {
  return (
    <Layout>
      <main className="pt-20">
        <Hero />
        <AboutSection />
        <SoftwareSection />
        <FeaturesSection />
        <ContactSection />
      </main>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 