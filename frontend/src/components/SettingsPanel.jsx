import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SettingsPanel = () => {
    const { theme, toggleTheme, fontSize, setFontSize, fontFamily, setFontFamily } = useTheme();

    return (
        <div className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">

            <div className="p-4 space-y-5">

                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Theme</label>
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600 group"
                    >
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                        <span className="text-lg bg-white dark:bg-gray-600 p-1 rounded-md shadow-sm group-hover:scale-110 transition-transform">
                            {theme === 'light' ? '☀️' : '🌙'}
                        </span>
                    </button>
                </div>

                <hr className="border-gray-100 dark:border-gray-700" />

                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Text Size</label>
                    <div className="flex bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
                        {['14px', '16px', '18px', '20px'].map((label, idx) => {
                            const values = ['87.5%', '100%', '112.5%', '125%'];
                            const sizes = ['0.75rem', '0.9rem', '1.1rem', '1.25rem'];
                            return (
                                <button
                                    key={label}
                                    onClick={() => setFontSize(values[idx])}
                                    className={`flex-1 py-1.5 rounded-md flex items-center justify-center transition-all ${fontSize === values[idx]
                                            ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 ring-1 ring-black/5'
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                                        }`}
                                >
                                    <span style={{ fontSize: sizes[idx], fontWeight: 'bold' }}>A</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <hr className="border-gray-100 dark:border-gray-700" />

                <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Font Style</label>
                    <div className="space-y-1">
                        {[
                            { id: 'sans', name: 'Modern', font: 'Inter, sans-serif' },
                            { id: 'serif', name: 'Classic', font: 'Merriweather, serif' },
                            { id: 'mono', name: 'Tech', font: 'Fira Code, monospace' }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFontFamily(item.id)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all flex justify-between items-center ${fontFamily === item.id
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                    }`}
                                style={{ fontFamily: item.font }}
                            >
                                <span>{item.name}</span>
                                {fontFamily === item.id && <span className="text-xs">●</span>}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;