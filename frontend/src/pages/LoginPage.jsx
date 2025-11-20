// pages/LoginPage.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const navigate = useNavigate();
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
        const data_login = {
            username: userlog.user,
            password: userlog.pass
        };

        try {
            const resp = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_login)
            });

            if(resp.ok){
                const data = await resp.json();
                navigate('/HomePage')
                // TODO: token saving
                setError('');
            } else {
                setError("Wrong username or password");
            }
        } catch(error){
            setError("Server is not available");
        }
    };

    return (
        <div className="flex flex-col gap-12 justify-center items-center min-h-screen 
                        bg-gradient-to-b from-gray-200 to-gray-400 p-4">
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col justify-center items-center w-full max-w-md p-6 sm:p-8 gap-4 border-2 border-black 
                           shadow-2xl shadow-gray-700 bg-white rounded-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Logowanie</h2>

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
                <Link to='/register' className="text-blue-600 hover:underline transition-all duration-200">don't have account?</Link>
                <button
                    type="submit" 
                    className="mt-4 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg shadow transition-colors bg-blue-600 hover:bg-blue-700 w-full">
                    Zaloguj
                </button>
            </form>

            {error && (
                <div className="text-sm sm:text-base text-red-600 text-center mt-2">
                    {error}
                </div>
            )}
        </div>
    );
};

export default LoginPage;