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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm dark:bg-slate-900/98 border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0 flex-1 sm:flex-initial">
            <a href="#" className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Marine Management System Logo" 
                  className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain filter brightness-0 dark:brightness-100 transition-all duration-200"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs sm:text-base lg:text-lg font-semibold text-slate-900 dark:text-slate-50 leading-tight truncate">
                  Marine Management System
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-normal hidden lg:block">
                  AI-Powered Digital Transformation
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 font-medium text-sm relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-slate-900 dark:bg-slate-100 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <LanguageSelector />
            </div>
            <div className="px-2 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <ThemeToggle />
            </div>
            <button
              onClick={handleDemo}
              className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-5 py-2 rounded-lg font-medium transition-all duration-200 text-sm"
            >
              {t('nav.demo')}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-1 flex-shrink-0">
            <div className="flex items-center space-x-1 px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <LanguageSelector />
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <ThemeToggle />
            </div>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mobile-menu professional-slide-down">
            <div className="mx-4 mt-3 mb-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden">
              {/* Mobile Navigation Items */}
              <div className="py-2">
                {navigation.map((item, index) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="mobile-nav-item w-full text-left px-4 py-3 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 font-medium text-sm border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Mobile Demo Button */}
              <div className="p-3 bg-slate-50 dark:bg-slate-750 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={handleDemo}
                  className="w-full bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-sm"
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