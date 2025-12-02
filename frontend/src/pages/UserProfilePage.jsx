import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../apiClient";

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetchUserProfile();
    }, []);

    async function fetchUserProfile() {
        try {
            const { data: userData } = await api.get('/api/advertisements/user')
            setUser(userData);

            /* Warto tutaj dorobic moze ProfileController zeby nie właziło to w /api/advertisements*/

            // const { data: adsData } = await api.get(`/api/advertisements/user/${userData.id}`)
            // setAdvertisements(adsData);

        } catch (error) {
            console.error('Błąd:', error);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }

    async function deleteAdvertisement(adId) {
        if (!window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) return;

        try {
            const response = await fetch(`http://localhost:3333/api/advertisements/${adId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setAdvertisements(advertisements.filter(ad => ad.advertisementId !== adId));
                alert('Ogłoszenie usunięte');
            }
        } catch (error) {
            console.error('Błąd:', error);
        }
    }

    if (loading) {
        return <div className="p-4 text-center">Ładowanie...</div>;
    }

    if (!user) {
        return <div className="p-4 text-center">Nie udało się załadować profilu</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            {/* Dane użytkownika */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">Mój profil</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600">Imię i nazwisko:</p>
                        <p className="text-xl font-semibold">{user.firstName} {user.lastName}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Email:</p>
                        <p className="text-xl font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Telefon:</p>
                        <p className="text-xl font-semibold">{user.phoneNumber || 'Nie podano'}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Miasto:</p>
                        <p className="text-xl font-semibold">{user.city || 'Nie podano'}</p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/edit-profile')}
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Edit profile
                </button>
            </div>

            {/* Moje ogłoszenia */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Moje ogłoszenia ({advertisements.length})</h2>

                {advertisements.length === 0 ? (
                    <p className="text-gray-600">Nie masz żadnych ogłoszeń. 
                        <a href="/add-car" className="text-blue-500 hover:underline"> Dodaj pierwsze!</a>
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {advertisements.map(ad => (
                            <div key={ad.advertisementId} className="border rounded-lg p-4 hover:shadow-lg transition">
                                <h3 className="text-lg font-semibold mb-2">{ad.title}</h3>
                                <p className="text-gray-600 mb-2">{ad.description}</p>
                                
                                <div className="mb-3">
                                    {ad.car && (
                                        <p className="text-sm text-gray-500">
                                            {ad.car.carBrand} {ad.car.carModel} ({ad.car.productionYear})
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-xl font-bold text-green-600">{ad.car?.price} PLN</p>
                                    <div className="space-x-2">
                                        <button 
                                            onClick={() => navigate(`/car/${ad.advertisementId}`)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                                        >
                                            Szczegóły
                                        </button>
                                        <button 
                                            onClick={() => deleteAdvertisement(ad.advertisementId)}
                                            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                                        >
                                            Usuń
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => navigate('/add-car')}
                    className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 w-full"
                >
                    + Add new advertisement
                </button>
            </div>
        </div>
    );
};

export default UserProfilePage;
