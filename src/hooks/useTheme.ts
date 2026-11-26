import { useContext } from 'react';
import { ThemeContext, ThemeContextValue } from '../context/ThemeContext';

export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }
    return context;
}