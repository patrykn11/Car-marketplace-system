import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const {isAuthenticated, login } = useAuth(); 
    
    const [userlog, setUserlog] = useState({ user: "", pass: "" });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {

            await login(userlog.user, userlog.pass);
            
            navigate('/'); 
        } catch(err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-screen 
                        bg-gradient-to-b from-gray-200 to-gray-400 p-4">
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col justify-center items-center w-full max-w-md p-6 sm:p-8 gap-4 border-2 border-black 
                           shadow-2xl shadow-gray-700 bg-white rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">LOGIN</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={userlog.user}
                    onChange={handleUserChange} 
                    className="w-full p-2 sm:p-3 resize-none rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input
                    type="password"
                    placeholder="Password"
                    value={userlog.pass} 
                    onChange={handlePassChange} 
                    className="w-full p-2 sm:p-3 resize-none rounded border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                
                <Link to='/register' className="text-blue-600 hover:underline transition-all duration-200">
                    don't have an account?
                </Link>
                
                <button
                    type="submit" 
                    className="mt-4 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg shadow transition-colors bg-blue-600 hover:bg-blue-700 w-full">
                    Login
                </button>
            </form>

            {error && (
                <div className="text-sm sm:text-base text-red-600 text-center mt-2 font-medium">
                    {error}
                </div>
            )}
        </div>
    );
};

export default LoginPage;