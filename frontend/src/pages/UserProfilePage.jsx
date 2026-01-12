import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [myAdvertisements, setMyAdvertisements] = useState([]);
    const [favoriteAds, setFavoriteAds] = useState([]);
    const [friendsAds, setFriendsAds] = useState([]);

    const [loading, setLoading] = useState(true);
    const [invitations, setInvitations] = useState([]);

    const [invitationFromUser, setInvitationFromUser] = useState(false);
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState('my-listings');

    const { authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await authFetch('http://localhost:8000/api/profile/stats');
                if (response.ok) {
                    const data = await response.json();
                    setStats(data);
                } else {
                    console.error('Failed to fetch stats');
                    setStats({ totalViews: 0, totalContacts: 0, totalLikes: 0 });
                }
            } catch (err) {
                console.error('Error fetching stats:', err);
                setStats({ totalViews: 0, totalContacts: 0, totalLikes: 0 });
            }
        };

        if (isAuthenticated) {
            fetchStats();
        }
    }, [authFetch, isAuthenticated]);

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
    }, [authFetch]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
        fetchFriendsAdvertisements();
    }, [isAuthenticated, navigate]);

    async function fetchUserProfile() {
        try {
            const userResponse = await authFetch('http://localhost:8000/api/profile/me');
            if (!userResponse.ok) throw new Error('Failed to fetch user data!');
            const userData = await userResponse.json();
            setUser(userData);

            const myAdsResponse = await authFetch('http://localhost:8000/api/profile/user/advertisements');
            if (!myAdsResponse.ok) throw new Error('Failed to fetch user ads!');
            const myAdsData = await myAdsResponse.json();
            setMyAdvertisements(myAdsData);

            const favResponse = await authFetch('http://localhost:8000/api/favorites/list');
            if (favResponse.ok) {
                const favData = await favResponse.json();
                setFavoriteAds(favData);
            }

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    }

    async function fetchFriendsAdvertisements() {
        try {
            const response = await authFetch('http://localhost:8000/api/profile/friends/advertisements');
            if (!response.ok) throw new Error('Failed to fetch friends ads!');
            const data = await response.json();
            setFriendsAds(data);
        } catch (error) {
            console.error('Error fetching friends ads: ', error);
        }
    }

    async function deleteAdvertisement(adId) {
        try {
            const response = await authFetch(`http://localhost:8000/api/advertisements/remove/${adId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                setMyAdvertisements(prev => prev.filter(ad => ad.advertisementId !== adId));
            } else {
                console.error('Failed to delete advertisement');
            }
        } catch (error) {
            console.error('Error deleting advertisement:', error);
        }
    }
    const removeFromFavorites = async (adId) => {
        try {
            const res = await authFetch(`http://localhost:8000/api/favorites/${adId}`, { method: 'DELETE' });
            if (res.ok) {
                setFavoriteAds(prev => prev.filter(ad => ad.advertisementId !== adId));
            }
        } catch (err) {
            console.error(err);
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

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (!user) return <div className="p-4 text-center">Failed to load profile</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg transition-colors duration-300">
                    <div className="bg-blue-600 dark:bg-blue-900 h-36 relative"></div>
                    <div className="pt-8 pb-8 px-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{user.username}</h1>
                                <p className="text-gray-500 dark:text-gray-400">EITI MOTO Member</p>
                            </div>
                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="mt-4 md:mt-0 px-6 py-3 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-200 font-medium transition-all duration-300 flex items-center gap-2 shadow-sm"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-5 border border-blue-100 dark:border-blue-800/50">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                                <p className="text-gray-900 dark:text-gray-100 font-medium break-all">{user.email}</p>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-5 border border-green-100 dark:border-green-800/50">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">{user.contactNumber || 'Not provided'}</p>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-5 border border-purple-100 dark:border-purple-800/50">
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Location</p>
                                <p className="text-gray-900 dark:text-gray-100 font-medium">{user.location || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {invitations.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Invitations</h2>
                        {invitations.map((invitation) => (
                            <div key={invitation.username} className="flex items-center justify-between bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-xl shadow-sm">
                                <span className="font-medium text-gray-800 dark:text-gray-200">{invitation.username}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => acceptInvitation(invitation.username)} className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">Accept</button>
                                    <button onClick={() => declineInvitation(invitation.username)} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm">Decline</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Statistic Panel</h2>

                    {stats ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-800 rounded-full flex items-center justify-center mb-3 text-indigo-600 dark:text-indigo-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Total Views</span>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/50 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-800 rounded-full flex items-center justify-center mb-3 text-emerald-600 dark:text-emerald-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalContacts}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Contacts</span>
                            </div>

                            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 border border-rose-100 dark:border-rose-800/50 flex flex-col items-center justify-center text-center">
                                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-800 rounded-full flex items-center justify-center mb-3 text-rose-600 dark:text-rose-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <span className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalLikes}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mt-1">Opinions</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">Loading statistics...</div>
                    )}
                </div>

                <div className="flex space-x-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                    <button
                        onClick={() => setActiveTab('my-listings')}
                        className={`px-4 py-2 font-medium rounded-lg transition-colors ${activeTab === 'my-listings' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
                    >
                        My Listings ({myAdvertisements.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('favorites')}
                        className={`px-4 py-2 font-medium rounded-lg transition-colors ${activeTab === 'favorites' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
                    >
                        Favorites ({favoriteAds.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('friends-listings')}
                        className={`px-4 py-2 font-medium rounded-lg transition-colors ${activeTab === 'friends-listings' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'}`}
                    >
                        Friends' Ads ({friendsAds.length})
                    </button>
                </div>

                {activeTab === 'my-listings' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Listings</h2>
                            <button onClick={() => navigate('/add-car')} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-lg shadow-blue-600/20">Add Listing</button>
                        </div>
                        {myAdvertisements.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-10">You don't have any listings yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myAdvertisements.map(ad => (
                                    <AdCard
                                        key={ad.advertisementId}
                                        ad={ad}
                                        navigate={navigate}
                                        onDelete={() => deleteAdvertisement(ad.advertisementId)}
                                        isOwner={true}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'favorites' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Favorite Listings</h2>
                        {favoriteAds.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No favorites yet.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoriteAds.map(ad => (
                                    <AdCard
                                        key={ad.advertisementId}
                                        ad={ad}
                                        navigate={navigate}
                                        customAction={
                                            <button
                                                onClick={() => removeFromFavorites(ad.advertisementId)}
                                                className="text-red-500 hover:text-red-700 text-sm font-medium"
                                            >
                                                Remove from Favorites
                                            </button>
                                        }
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'friends-listings' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Friends' Listings</h2>
                        {friendsAds.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-10">No listings from friends.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {friendsAds.map(ad => (
                                    <AdCard key={ad.advertisementId} ad={ad} navigate={navigate} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

const AdCard = ({ ad, navigate, onDelete, isOwner, customAction }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
        <div className="h-48 bg-gray-100 dark:bg-gray-700 relative">
            <img
                className="w-full h-full object-cover"
                src={ad.hasImage
                    ? `http://localhost:8000/api/advertisements/${ad.advertisementId}/image`
                    : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                }
                alt={ad.title}
            />
            <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white text-sm font-bold rounded-lg shadow-lg">
                {ad.carData.price} PLN
            </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-1">{ad.title}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">{ad.carData.carBrand}</span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">{ad.carData.productionYear}</span>
            </div>

            <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                <button
                    onClick={() => navigate(`/cars/${ad.advertisementId}`)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    View Details
                </button>

                {isOwner && (
                    <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                )}
                {customAction}
            </div>
        </div>
    </div>
);

export default UserProfilePage;