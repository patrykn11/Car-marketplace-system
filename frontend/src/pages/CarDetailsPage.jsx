import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const CarDetailsPage = () => {
    const { id } = useParams();
    const { token, authFetch, isAuthenticated, username } = useAuth();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [invitationFromUser, setInvitationFromUser] = useState(false);
    const [acceptedInvitationFromUser, setAcceptedInvitationFromUser] = useState(false);
    const [sentInvitation, setSentInvitation] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [loadingInvite, setLoadingInvite] = useState(false);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await authFetch(`http://localhost:3333/api/advertisements/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch car details');
                }
                const data = await response.json();
                setCar(data);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCarDetails();
    }, [id, authFetch]);

    useEffect(() => {
        if (!isAuthenticated || !car || username === car.username) return;

        const checkStatus = async () => {
            try {
                const fromRes = await authFetch(`http://localhost:3333/api/invitations/from/${car.username}`);
                const fromData = await fromRes.json();
                setInvitationFromUser(fromData);

                const acceptedRes = await authFetch(`http://localhost:3333/api/invitations/Accepted/${car.username}`);
                const acceptedData = await acceptedRes.json();
                setAcceptedInvitationFromUser(acceptedData);

                const sentRes = await authFetch(`http://localhost:3333/api/invitations/sent/${car.username}`);
                const sentData = await sentRes.json();
                setSentInvitation(sentData);

                const friendRes = await authFetch(`http://localhost:3333/api/friends/isFriend/${car.username}`);
                const friendData = await friendRes.json();
                setIsFriend(friendData);

            } catch (err) {
                console.error('Error checking invitations/friend status:', err);
            }
        };

        checkStatus();
    }, [isAuthenticated, car, username, authFetch]);

    const handleFriendAction = async () => {
        setLoadingInvite(true);
        try {
            const url = invitationFromUser
                ? `http://localhost:3333/api/invitations/accept/${car.username}`
                : `http://localhost:3333/api/invitations/add/${car.username}`;

            const res = await authFetch(url, { method: 'POST' });
            if (res.ok) {
                alert(invitationFromUser ? 'Invitation accepted' : 'Invitation sent');
                setInvitationFromUser(false);
                setSentInvitation(!invitationFromUser);
                setAcceptedInvitationFromUser(invitationFromUser);
                if (!invitationFromUser) setIsFriend(true);
            } else {
                alert('Action failed');
            }
        } catch (err) {
            console.error('Friend invitation error:', err);
        } finally {
            setLoadingInvite(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center p-4">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Error</h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{error}</p>
                <button
                    onClick={() => navigate('/cars')}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Back to Listings
                </button>
            </div>
        );
    }

    if (!car) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900">
                <div className="text-xl text-gray-500 dark:text-gray-400">Car not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="mb-4 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                    &larr; Back
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                    <div className="md:flex">
                        
                        <div className="md:w-1/2 bg-gray-200 dark:bg-gray-700 relative">
                            <img
                                className="w-full h-96 object-cover"
                                src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
                                alt={`${car.carData.carBrand} ${car.carData.carModel}`}
                            />
                        </div>

                        <div className="md:w-1/2 p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">
                                        {car.carData.carBrand} {car.carData.carModel}
                                    </h1>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg transition-colors">{car.title}</p>
                                </div>
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                                    {car.carData.price.toLocaleString()} PLN
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <DetailTile label="Year" value={car.carData.productionYear} />
                                <DetailTile label="Mileage" value={`${car.carData.mileage.toLocaleString()} km`} />
                                <DetailTile label="Fuel Type" value={car.carData.fuelType} />
                                <DetailTile label="Transmission" value={car.carData.transmission} />
                                <DetailTile label="Power" value={`${car.carData.power} HP`} />
                                <DetailTile label="Color" value={car.carData.carColor} />
                                <DetailTile label="Engine" value={`${car.carData.engineCapacity} L`} />
                                <DetailTile label="Location" value={car.location} />
                            </div>

                            <div className="prose max-w-none mb-8">
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors">Description</h3>
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed transition-colors">
                                    {car.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors">
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white transition-colors">Seller Info</h3>
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-300">Posted by: <span className="font-medium text-gray-900 dark:text-white">{car.username}</span></p>
                                        <p className="text-gray-600 dark:text-gray-300">Contact: <span className="font-medium text-gray-900 dark:text-white">{car.contactNumber}</span></p>
                                    </div>

                                    {isAuthenticated && username !== car.username && !isFriend && !acceptedInvitationFromUser && (
                                        invitationFromUser ? (
                                            <button
                                                onClick={handleFriendAction}
                                                disabled={loadingInvite}
                                                className="px-4 py-2 rounded-lg font-medium transition-colors bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-blue-300"
                                            >
                                                Accept {car.username}'s invitation
                                            </button>
                                        ) : !sentInvitation ? (
                                            <button
                                                onClick={handleFriendAction}
                                                disabled={loadingInvite}
                                                className="px-4 py-2 rounded-lg font-medium transition-colors bg-green-100 hover:bg-green-200 text-green-700 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300"
                                            >
                                                Add {car.username} to friends
                                            </button>
                                        ) : (
                                            <span className="text-gray-500 dark:text-gray-400 text-sm italic">Request sent</span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailTile = ({ label, value }) => (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-300">
        <span className="block text-gray-500 dark:text-gray-400 text-sm mb-1">{label}</span>
        <span className="font-semibold text-gray-900 dark:text-gray-100">{value}</span>
    </div>
);

export default CarDetailsPage;