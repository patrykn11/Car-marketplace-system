import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

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