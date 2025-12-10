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

    // Fetch car details
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await authFetch(`http://localhost:3333/api/advertisements/${id}`);
                if (!response.ok) throw new Error('Failed to fetch car details');
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

    // Handle add/accept friend
    const handleFriendAction = async () => {
        setLoadingInvite(true);
        try {
            const url = invitationFromUser
                ? `http://localhost:3333/api/invitations/accept/${car.username}`
                : `http://localhost:3333/api/invitations/add/${car.username}`;

            const res = await authFetch(url, { method: 'POST' });
            if (res.ok) {
                alert(invitationFromUser ? 'Invitation accepted' : 'Invitation sent');
                // Update state after action
                setInvitationFromUser(false);
                setSentInvitation(!invitationFromUser);
                setAcceptedInvitationFromUser(invitationFromUser);
                if (!invitationFromUser) setIsFriend(true); // jeśli wysłaliśmy zaproszenie, w backendzie może od razu być zaakceptowane
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
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-4">
                <h2 className="text-2xl font-bold">Error</h2>
                <p>{error}</p>
                <button
                    onClick={() => navigate('/cars')}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Back to Listings
                </button>
            </div>
        );
    }

    if (!car) {
        return <div className="text-center p-4">Car not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/2">
                        <img
                            className="w-full h-96 object-cover"
                            src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8"}
                            alt={`${car.carData.carBrand} ${car.carData.carModel}`}
                        />
                    </div>

                    <div className="md:w-1/2 p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {car.carData.carBrand} {car.carData.carModel}
                                </h1>
                                <p className="text-gray-500 text-lg mb-4">{car.title}</p>
                            </div>
                            <span className="text-2xl font-bold text-blue-600">
                                {car.carData.price.toLocaleString()} PLN
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Year</span>
                                <span className="font-semibold">{car.carData.productionYear}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Mileage</span>
                                <span className="font-semibold">{car.carData.mileage.toLocaleString()} km</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Fuel Type</span>
                                <span className="font-semibold">{car.carData.fuelType}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Transmission</span>
                                <span className="font-semibold">{car.carData.transmission}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Power</span>
                                <span className="font-semibold">{car.carData.power} HP</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Color</span>
                                <span className="font-semibold">{car.carData.carColor}</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Engine Capacity</span>
                                <span className="font-semibold">{car.carData.engineCapacity} L</span>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <span className="block text-gray-500 text-sm">Location</span>
                                <span className="font-semibold">{car.location}</span>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 whitespace-pre-line">{car.description}</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-2">Seller Info</h3>
                            <p className="text-gray-600">Posted by: {car.username}</p>
                            <p className="text-gray-600">Contact: {car.userPhoneNumber}</p>

                            {isAuthenticated && username !== car.username && !isFriend && !acceptedInvitationFromUser && (
                                invitationFromUser ? (
                                    <button
                                        onClick={handleFriendAction}
                                        className="mt-4 px-4 py-2 rounded-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
                                    >
                                        Accept {car.username}'s invitation
                                    </button>
                                ) : !sentInvitation ? (
                                    <button
                                        onClick={handleFriendAction}
                                        className="mt-4 px-4 py-2 rounded-lg font-medium bg-green-100 hover:bg-green-200 text-green-700 transition"
                                    >
                                        Add {car.username} to friends
                                    </button>
                                ) : null
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;