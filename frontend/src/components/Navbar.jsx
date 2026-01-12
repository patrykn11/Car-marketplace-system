import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SettingsPanel from './SettingsPanel';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const getLinkClass = (path) => {
        const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ";
        const activeClass = "border-blue-500 text-gray-900 dark:text-white";
        const inactiveClass = "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500 hover:text-gray-700 dark:hover:text-white";

        return baseClass + (location.pathname === path ? activeClass : inactiveClass);
    };

    return (
        <nav className="fixed w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-500 transition-colors">
                                EITI MOTO
                            </Link>
                        </div>

                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className={getLinkClass('/')}>
                                Home
                            </Link>
                            <Link to="/cars" id="nav-browse" className={getLinkClass('/cars')}>
                                Browse Cars
                            </Link>
                            {isAuthenticated && (
                                <Link to="/add-car" id="nav-add-car" className={getLinkClass('/add-car')}>
                                    Add Car
                                </Link>
                            )}
                            <Link to="/valuation" id="nav-valuation" className={getLinkClass('/valuation')}>
                                Valuation
                            </Link>
                            <Link to="/film" className={getLinkClass('/film')}>
                                Car Reviews
                            </Link>
                            <Link to="/news" className={getLinkClass('/news')}>
                                News
                            </Link>
                            <Link to="/catalog" className={getLinkClass('/catalog')}>
                                Catalogs
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center gap-3">
                        
                        <div className="relative">
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className={`p-2 rounded-lg transition-all duration-200 focus:outline-none ${
                                    isSettingsOpen 
                                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400 rotate-90' 
                                    : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                                }`}
                                title="Appearance Settings"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>

                            {isSettingsOpen && (
                                <SettingsPanel />
                            )}
                        </div>

                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    id="nav-register"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition-all hover:shadow-lg"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    My profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;