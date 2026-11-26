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
};

export const palettes: Record<ThemeName, ColorPalette> = {
    light: lightColors,
    dark: darkColors,
};