import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../apiClient";

const UpdateProfilePage = () => {
    const [userNewEmail, setUserNewEmail] = useState("");
    const [userNewContactNumber, setUserNewContactNumber] = useState("");
    const [userNewLocation, setUserNewLocation] = useState("");

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile();
    }

    async function updateUserProfile() {
        setLoading(true);
        setError("");

        let newEmail = "";
        let newContactNumber = "";
        let newLocation = "";

        if (userNewEmail.trim()) newEmail = userNewEmail;
        if (userNewContactNumber.trim()) newContactNumber = userNewContactNumber;
        if (userNewLocation.trim()) newLocation = userNewLocation;

        try {
            const response = await fetch("http://localhost:8000/api/profile/edit_profile/me", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ newContactNumber, newEmail, newLocation })
            });

            if (!response.ok) {
                const error_message = await response.text();
                throw new Error(error_message || "Profile update error");
            }

            navigate('/profile');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Update Profile</h2>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* EMAIL INPUT */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={userNewEmail}
                            onChange={(e) => setUserNewEmail(e.target.value)}
                            placeholder="Enter new email"
                            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500
                               border border-gray-300 dark:border-gray-600
                               bg-white dark:bg-gray-700
                               text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-400 transition-colors"
                        />
                    </div>

                    {/* CONTACT NUMBER INPUT */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Contact Number
                        </label>
                        <input
                            type="tel"
                            value={userNewContactNumber}
                            onChange={(e) => setUserNewContactNumber(e.target.value)}
                            placeholder="Enter new contact number"
                            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500
                               border border-gray-300 dark:border-gray-600
                               bg-white dark:bg-gray-700
                               text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-400 transition-colors"
                        />
                    </div>

                    {/* LOCATION INPUT */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            value={userNewLocation}
                            onChange={(e) => setUserNewLocation(e.target.value)}
                            placeholder="Enter new location"
                            className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500
                               border border-gray-300 dark:border-gray-600
                               bg-white dark:bg-gray-700
                               text-gray-900 dark:text-white
                               placeholder-gray-400 dark:placeholder-gray-400 transition-colors"
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700
                               disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? "Updating..." : "Update Profile"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-2 rounded-md transition-colors
                               bg-gray-300 text-gray-800 hover:bg-gray-400
                               dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProfilePage;