import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageSelector } from '../ui/LanguageSelector';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { 
      name: t('nav.home'), 
      href: '#home',
      type: 'single'
    },
    {
      name: t('nav.about'),
      type: 'dropdown',
      items: [
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.vision'), href: '#vision' },
        { name: t('nav.mission'), href: '#mission' },
        { name: t('nav.promises'), href: '#promises' },
      ]
    },
    {
      name: t('nav.software'),
      type: 'dropdown',
      items: [
        { name: 'MMS NB - Yeni İnşa', href: '#software-nb' },
        { name: 'MMS SRM - Tersane Yönetimi', href: '#software-srm' },
        { name: 'MMS Yacht - Yat İnşa', href: '#software-yacht' },
        { name: 'Tüm Yazılımlar', href: '#software' },
      ]
    },
    { 
      name: t('nav.packages'), 
      href: '#packages',
      type: 'single'
    },
    { 
      name: t('nav.contact'), 
      href: '#contact',
      type: 'single'
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-50/95 backdrop-blur-md dark:bg-slate-900/95 border-b border-slate-200/30 dark:border-slate-700/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Marine Management System Logo" 
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
                  Marine Management System
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  AI-Powered Digital Transformation
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6" ref={dropdownRef}>
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.type === 'single' ? (
                  <a
                    href={item.href}
                    className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium text-sm relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <div className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className="flex items-center space-x-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium text-sm relative group"
                    >
                      <span>{item.name}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-slate-50/95 backdrop-blur-md dark:bg-slate-800/95 rounded-lg shadow-xl border border-slate-200/50 dark:border-slate-700/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {item.items?.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              {t('nav.demo')}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-50/95 backdrop-blur-md dark:bg-slate-900/95 border-t border-slate-200/50 dark:border-slate-700/50 rounded-b-lg shadow-lg">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.type === 'single' ? (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <div>
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="flex items-center justify-between w-full px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.items?.map((subItem) => (
                            <a
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {subItem.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg">
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