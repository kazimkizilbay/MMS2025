import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../lib/theme';
import { useTranslation } from 'react-i18next';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const themes = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'system', icon: Monitor, label: t('theme.system') },
  ] as const;

  return (
    <div className="flex items-center space-x-1 rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200
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
  );
} 