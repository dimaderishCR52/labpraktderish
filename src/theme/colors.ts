export type ThemeName = 'light' | 'dark';

export interface ColorPalette {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    onPrimary: string;
    accent: string;
    selected: string;
    danger: string;
    success: string;
    completedBackground: string;
    highlight: string;
}

export const lightColors: ColorPalette = {
    background: '#f2f3f5',
    card: '#ffffff',
    text: '#222222',
    textSecondary: '#666666',
    border: '#cccccc',
    primary: '#222222',
    onPrimary: '#ffffff',
    accent: '#3157a4',
    selected: '#6d8be8',
    danger: '#c62828',
    success: '#2e7d32',
    completedBackground: '#e8f3ea',
    highlight: '#fff2b8',
};

export const darkColors: ColorPalette = {
    background: '#121212',
    card: '#202124',
    text: '#ffffff',
    textSecondary: '#c1c1c1',
    border: '#555555',
    primary: '#eeeeee',
    onPrimary: '#222222',
    accent: '#b8c7ff',
    selected: '#6d8be8',
    danger: '#ff8a80',
    success: '#81c784',
    completedBackground: '#1c2a20',
    highlight: '#4a4020',
};

export const palettes: Record<ThemeName, ColorPalette> = {
    light: lightColors,
    dark: darkColors,
};