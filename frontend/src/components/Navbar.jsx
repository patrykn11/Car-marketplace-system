import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext'
const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    return (
        <nav className="fixed w-full bg-white z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
                                EITI MOTO
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/cars"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Browse Cars
                            </Link>
                            {isAuthenticated && <Link
                                to="/add-car"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Add Car
                            </Link>}
                            <Link
                                to="/valuation"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Valuation
                            </Link>
                            <Link to="/film"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Car Reviews
                            </Link>

                            <Link to="/news"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                News
                            </Link>
                            <Link to="/catalog"
                            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Catalogs
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {!isAuthenticated ? (<><Link
                            to="/login"
                            className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Login
                        </Link>
                            <Link
                                to="/register"
                                className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium ml-3"
                            >
                                Register
                            </Link></>) : (<>
                                <Link
                                    to="/profile"
                                    className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    My profile
                                </Link>
                                <button onClick={logout} className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium ml-3">
                                    Logout
                                </button>
                            </>)}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
