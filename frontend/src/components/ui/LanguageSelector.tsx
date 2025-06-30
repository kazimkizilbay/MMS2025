import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' },
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 min-w-[28px] min-h-[28px]"
      >
        <span className="text-base">{currentLanguage.flag}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 text-slate-500 dark:text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`
              w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200
              ${i18n.language === language.code ? 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}
              first:rounded-t-lg last:rounded-b-lg
            `}
          >
            <span className="text-base">{language.flag}</span>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{language.name}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase">{language.code}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 