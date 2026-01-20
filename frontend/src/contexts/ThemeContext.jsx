import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * Context for managing application theme and appearance settings.
 */
const ThemeContext = createContext();

/**
 * Custom hook to access theme context.
 * Provides access to theme, fontSize, fontFamily and their setters.
 * 
 * @returns {Object} Theme context value
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Theme provider component that manages appearance settings.
 * Handles dark/light mode, font size, and font family preferences.
 * Persists settings to localStorage and applies them to document root.
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @returns {JSX.Element} Provider component with theme context
 */
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const [fontSize, setFontSize] = useState(localStorage.getItem('app_fontSize') || '100%');

    const [fontFamily, setFontFamily] = useState(localStorage.getItem('app_fontFamily') || 'sans');

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);

        root.style.fontSize = fontSize;
        localStorage.setItem('app_fontSize', fontSize);

        if (fontFamily === 'serif') {
            root.style.setProperty('--font-main', "'Merriweather', serif");
        } else if (fontFamily === 'mono') {
            root.style.setProperty('--font-main', "'Fira Code', monospace");
        } else {
            root.style.setProperty('--font-main', "'Inter', sans-serif");
        }
        localStorage.setItem('app_fontFamily', fontFamily);

    }, [theme, fontSize, fontFamily]);

    /**
     * Toggle between light and dark theme modes.
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{
            theme, toggleTheme,
            fontSize, setFontSize,
            fontFamily, setFontFamily
        }}>
            {children}
        </ThemeContext.Provider>
    );
};