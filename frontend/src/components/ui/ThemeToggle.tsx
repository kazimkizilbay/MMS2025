import { Moon, Sun, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../../lib/theme-context';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'system', icon: Monitor, label: t('theme.system') },
  ] as const;

  const currentTheme = themes.find(t => t.value === theme) || themes[0];

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

  const handleThemeChange = (newTheme: typeof theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Desktop: Show all themes */}
      <div className="hidden sm:flex items-center space-x-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              flex items-center justify-center w-7 h-7 rounded-md transition-all duration-200
              ${
                theme === value
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }
            `}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Mobile: Single button with dropdown */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200 min-w-[28px] min-h-[28px]"
        >
          <currentTheme.icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 text-slate-500 dark:text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile dropdown */}
        <div className={`absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-200 z-50 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          {themes.map(({ value, icon: Icon, label }) => (
            <button
              key={value}
              onClick={() => handleThemeChange(value)}
              className={`
                w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200
                ${theme === value ? 'bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}
                first:rounded-t-lg last:rounded-b-lg
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 