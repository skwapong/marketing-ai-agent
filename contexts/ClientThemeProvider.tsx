'use client';

import { ThemeProvider } from './ThemeContext';

export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
