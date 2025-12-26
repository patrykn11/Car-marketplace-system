import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../apiClient";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [advertisements, setAdvertisements] = useState([]);
    const [friendsAds, setFriendsAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [invitations, setInvitations] = useState([]);
    const { authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await authFetch("/api/invitations");
                const data = await response.json();
                setInvitations(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchInvitations();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
        fetchFriendsAdvertisements();
    }, []);

    async function fetchUserProfile() {
        try {
            const { data: userData } = await api.get('/profile/me');
            setUser(userData);

            const { data: userAdsData } = await api.get('/profile/user/advertisements');
            setAdvertisements(userAdsData);
        } catch (error) {
            console.error('Error:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    async function fetchFriendsAdvertisements() {
        try {
            const { data: friendsAdsData } = await api.get('/profile/friends/advertisements');
            setFriendsAds(friendsAdsData);
        } catch (error) {
            console.error('Error fetching friends ads: ', error)
        }
    }

    // async function fetchFriendsAdvertisements() {
    //     try {
    //         const { data: friendsAdsData } = await api.get('/api/profile/friends/advertisements');
    //         setFriendsAds(friendsAdsData);
    //     } catch (error) {
    //         console.error('Error fetching friends ads:', error);
    //     }
    // }

    async function deleteAdvertisement(adId) {
        if (!window.confirm('Are you sure you want to delete this listing?')) return;

        try {
            await api.delete(`/advertisements/remove/${adId}`);
            setAdvertisements(advertisements.filter(ad => ad.advertisementId !== adId));
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete listing');
        }
    }

    async function acceptInvitation(username) {
        try {
            await authFetch(`/api/invitations/accept/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            setInvitations(prev => prev.filter(inv => inv.username !== username));
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function declineInvitation(username) {
        try {
            await authFetch(`/api/invitations/decline/${username}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            setInvitations(prev => prev.filter(inv => inv.username !== username));
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (!user) {
        return <div className="p-4 text-center">Failed to load profile</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-4">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                    <div className="bg-blue-600 h-36 relative"></div>

                    <div className="pt-8 pb-8 px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">{user.username}</h1>
                                <p className="text-gray-500">EITI MOTO Member</p>
                            </div>
                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="mt-4 md:mt-0 px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-300 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 hover:bg-blue-100 rounded-2xl p-5 border border-blue-100 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-xl">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Email</p>
                                        <p className="text-gray-900 font-medium">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50 hover:bg-green-100 rounded-2xl p-5 border border-green-100 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Phone</p>
                                        <p className="text-gray-900 font-medium">{user.contactNumber || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-purple-50 hover:bg-purple-100 rounded-2xl p-5 border border-purple-100 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-xl">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Location</p>
                                        <p className="text-gray-900 font-medium">{user.location || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-gray-900">Invitations</h2>
                    {invitations.length === 0 && <p className="text-gray-500">No invitations</p>}
                    {invitations.map((invitation) => (
                        <div
                            key={invitation.username}
                            className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            <span className="font-medium text-gray-800">{invitation.username}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => acceptInvitation(invitation.username)}
                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => declineInvitation(invitation.username)}
                                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Your Listings
                            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-600 text-lg rounded-full">{advertisements.length}</span>
                        </h2>
                        <button
                            onClick={() => navigate('/add-car')}
                            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg"
                        >
                            Add Listing
                        </button>
                    </div>

                    {advertisements.length === 0 ? (
                        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Listings</h3>
                            <p className="text-gray-500 mb-6">You don't have any listings yet. Start selling!</p>
                            <button
                                onClick={() => navigate('/add-car')}
                                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                Add your first listing →
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {advertisements.map(ad => (
                                <div
                                    key={ad.advertisementId}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                        <img
                                            className="w-full h-96 object-cover"
                                            src={ad.carData.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
                                        />
                                        <div className="absolute top-3 right-3 px-3 py-1 text-gray-600 bg-gray-100 text-sm font-bold rounded-lg shadow-lg">
                                            {ad.carData.price} PLN
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{ad.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.carBrand}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.productionYear}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.mileage} km</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-5">{ad.description}</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => navigate(`/cars/${ad.advertisementId}`)}
                                                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 text-sm"
                                            >
                                                Details
                                            </button>
                                            <button
                                                onClick={() => deleteAdvertisement(ad.advertisementId)}
                                                className="p-2 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Friends' Listings</h2>
                    {friendsAds.length === 0 ? (
                        <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-16 text-center">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Listings from friends</h3>
                            <p className="text-gray-500">Your friends haven't posted any listings yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {friendsAds.map(ad => (
                                <div
                                    key={ad.advertisementId}
                                    className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                        <img
                                            className="w-full h-96 object-cover"
                                            src={ad.carData.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
                                        />
                                        <div className="absolute top-3 right-3 px-3 py-1 text-gray-600 bg-gray-100 text-sm font-bold rounded-lg shadow-lg">
                                            {ad.carData.price} PLN
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1">{ad.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.carBrand}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.productionYear}</span>
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">{ad.carData.mileage} km</span>
                                        </div>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-5">{ad.description}</p>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => navigate(`/cars/${ad.advertisementId}`)}
                                                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 text-sm"
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default UserProfilePage;