import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' },
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <span className="text-lg">{currentLanguage.flag}</span>
        <Languages className="w-4 h-4" />
      </button>
      
              <div className="absolute right-0 top-full mt-2 w-40 bg-slate-50/95 backdrop-blur-md dark:bg-slate-800/95 rounded-lg shadow-lg border border-slate-200/50 dark:border-slate-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => i18n.changeLanguage(language.code)}
            className={`
              w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors
                              ${i18n.language === language.code ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'}
              first:rounded-t-lg last:rounded-b-lg
            `}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm font-medium">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 