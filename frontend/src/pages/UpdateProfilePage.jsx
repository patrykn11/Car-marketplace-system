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
                        const response = await fetch ("http://localhost:3333/api/profile/edit_profile/me", {
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

                        alert("Profile updated!");
                        navigate('/profile');
                } catch (error) {
                        setError(error.message);
                } finally {
                        setLoading(false);
                }
        }

        return (
                <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Profile</h2>
                                
                                {error && (
                                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                                                <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Email
                                                </label>
                                                <input
                                                        type="email"
                                                        value={userNewEmail}
                                                        onChange={(e) => setUserNewEmail(e.target.value)}
                                                        placeholder="Enter new email"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                        </div>

                                        <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Contact Number
                                                </label>
                                                <input
                                                        type="tel"
                                                        value={userNewContactNumber}
                                                        onChange={(e) => setUserNewContactNumber(e.target.value)}
                                                        placeholder="Enter new contact number"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                        </div>

                                        <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Location
                                                </label>
                                                <input
                                                        type="text"
                                                        value={userNewLocation}
                                                        onChange={(e) => setUserNewLocation(e.target.value)}
                                                        placeholder="Enter new location"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                                />
                                        </div>

                                        <div className="flex gap-3 pt-4">
                                                <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                                >
                                                        {loading ? "Updating..." : "Update Profile"}
                                                </button>
                                                <button
                                                        type="button"
                                                        onClick={() => navigate(-1)}
                                                        className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors"
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