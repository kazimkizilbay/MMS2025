import { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContext, ThemeContextType } from '../../lib/theme';

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'mms-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      // Eğer kullanıcı açıkça light mode seçtiyse onu kullan, yoksa dark mode varsayılan
      return savedTheme === 'light' ? 'light' : 'dark';
    }
  );

  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      setActualTheme(systemTheme);
    } else {
      root.classList.add(theme);
      setActualTheme(theme);
    }
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    actualTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
} 