import React, { useState, useEffect } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const CarDetailsPage = () => {
    const { id } = useParams();
    const { token, authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

        if (id) {
            fetchCarDetails();
        }
    }, [id, authFetch]);

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
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <img
                            className="w-full h-96 object-cover"
                            src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
                            alt={`${car.carData.carBrand} ${car.carData.carModel}`}
                        />
                    </div>

                    {/* Details Section */}
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
                        </div>

                        <div className="prose max-w-none">
                            <h3 className="text-xl font-semibold mb-2">Description</h3>
                            <p className="text-gray-600 whitespace-pre-line">
                                {car.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-semibold mb-2">Seller Info</h3>
                            <p className="text-gray-600">Posted by: {car.userFirstName} {car.userLastName}</p>
                            <p className="text-gray-600">Contact: {car.userPhoneNumber}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetailsPage;
