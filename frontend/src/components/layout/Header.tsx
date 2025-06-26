import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    { 
      name: t('nav.home'), 
      href: '#hero'
    },
    { 
      name: t('nav.about'), 
      href: '#about'
    },
    { 
      name: t('nav.software'), 
      href: '#software'
    },
    { 
      name: t('nav.packages'), 
      href: '#packages'
    },
    { 
      name: t('nav.contact'), 
      href: '#contact'
    },
  ];



  const handleNavigation = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const headerHeight = 80; // Header height
      // Calculate the element's position relative to the document
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setIsMenuOpen(false);
  };

  // Open demo form: scroll to contact and trigger demo modal
  const handleDemo = () => {
    handleNavigation('#contact');
    // Trigger demo modal after scroll
    setTimeout(() => {
      window.dispatchEvent(new Event('openDemoForm'));
    }, 800);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md dark:bg-slate-900/95 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Marine Management System Logo" 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain filter brightness-0 dark:brightness-100 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
                  Marine Management System
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium hidden md:block">
                  AI-Powered Digital Transformation
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium text-sm relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={handleDemo}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('nav.demo')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-800/80 rounded-lg p-1 backdrop-blur-sm">
              <ThemeToggle />
              <LanguageSelector />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2 bg-slate-100/80 dark:bg-slate-800/80 rounded-lg backdrop-blur-sm"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-50/95 backdrop-blur-md dark:bg-slate-900/95 border-t border-slate-200/50 dark:border-slate-700/50 rounded-b-lg shadow-lg">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="mobile-nav-item block w-full text-left px-3 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 mt-4">
                <button
                  onClick={handleDemo}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg"
                >
                  {t('nav.demo')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 