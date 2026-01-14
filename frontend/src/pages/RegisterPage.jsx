import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [userlog, setUserlog] = useState({ user: "", pass: "" });
    const [userEmail, setUserEmail] = useState('');
    const [userContactNumber, setContactNumber] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [error, setError] = useState('');

    const handlePassChange = (e) => {
        const value = e.target.value;
        setUserlog(prevData => ({
            ...prevData,
            pass: value
        }));
    };

    const handleUserChange = (e) => {
        const value = e.target.value;
        setUserlog(prevData => ({
            ...prevData,
            user: value
        }));
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setUserEmail(value);
    }

    const handleContactNumberChange = (e) => {
        const value = e.target.value;
        setContactNumber(value);
    }

    const handleLocationChange = (e) => {
        const value = e.target.value;
        setUserLocation(value);
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!userlog.user || !userlog.pass || !userEmail || !userContactNumber || !userLocation) {
            setError('Please fill in all fields.');
            return;
        }

        const data_login = {
            username: userlog.user,
            password: userlog.pass,
            email: userEmail,
            contactNumber: userContactNumber,
            location: userLocation
        };

        try {
            await register(data_login.username, data_login.password, data_login.email,
                data_login.contactNumber, data_login.location);
            navigate('/');
        }
        catch (error) {
            setError(error.message);

        }
    };

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-screen p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center items-center w-full max-w-md p-6 sm:p-8 gap-4
                   bg-white dark:bg-gray-800
                   border border-gray-200 dark:border-gray-700
                   shadow-2xl dark:shadow-gray-900/50
                   rounded-2xl transition-all duration-300"
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                    REGISTER
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={userlog.user}
                    onChange={handleUserChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                       bg-white text-gray-900 border-gray-300
                       dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={userlog.pass}
                    onChange={handlePassChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                       bg-white text-gray-900 border-gray-300
                       dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={handleEmailChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                       bg-white text-gray-900 border-gray-300
                       dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                />

                <input
                    type="text"
                    placeholder="+48 123 456 789"
                    value={userContactNumber}
                    onChange={handleContactNumberChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                       bg-white text-gray-900 border-gray-300
                       dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                />

                <input
                    type="text"
                    placeholder="Location ex. Warsaw"
                    value={userLocation}
                    onChange={handleLocationChange}
                    className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors
                       bg-white text-gray-900 border-gray-300
                       dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                />

                <Link
                    to='/login'
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-all duration-200"
                >
                    Sign in
                </Link>

                <button
                    type="submit"
                    className="mt-4 px-4 sm:px-6 py-3 text-white font-semibold rounded-xl shadow-lg
                       bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all w-full"
                >
                    Register
                </button>
            </form>

            {error && (
                <div className="text-sm sm:text-base text-red-600 dark:text-red-400 text-center mt-2 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    {error}
                </div>
            )}
        </div>
    );
};
export default RegisterPage;
