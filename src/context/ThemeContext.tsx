import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { ColorPalette, palettes, ThemeName } from '../theme/colors';
import { loadTheme, saveTheme } from '../storage/storage';

export interface ThemeContextValue {
    theme: ThemeName;
    colors: ColorPalette;
    isReady: boolean;
    setTheme: (theme: ThemeName) => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeName>('light');
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        let active = true;
        loadTheme().then((saved) => {
            if (!active) return;
            setThemeState(saved);
            setIsReady(true);
        });
        return () => {
            active = false;
        };
    }, []);

    const setTheme = useCallback((next: ThemeName) => {
        setThemeState(next);
        saveTheme(next).catch(() => {});
    }, []);

    const value = useMemo<ThemeContextValue>(
        () => ({ theme, colors: palettes[theme], isReady, setTheme }),
        [theme, isReady, setTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}