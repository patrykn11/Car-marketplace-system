const Footer = () => {
    return (
        <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    
                    <div>
                        <p className="text-sm">© 2025 EiTiMOTO. All rights reserved.</p>
                    </div>

                    <div className="flex space-x-6">
                        <a 
                            href="#" 
                            className="text-sm hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                        >
                            Privacy Policy
                        </a>
                        <a 
                            href="#" 
                            className="text-sm hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;