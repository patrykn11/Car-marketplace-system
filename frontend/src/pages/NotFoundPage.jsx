import { Link } from 'react-router-dom'; 

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-extrabold text-red-500 dark:text-red-400 drop-shadow-sm">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <div className="pt-4">
                    <Link 
                        to="/"
                        className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;