import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authFetch } = useAuth();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await authFetch('http://localhost:3333/api/advertisements');
                if (!response.ok) {
                    throw new Error('Failed to fetch advertisements');
                }
                const data = await response.json();
                setCars(data);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [authFetch]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-600 p-8">
                <h2 className="text-2xl font-bold mb-2">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Car Listings</h1>

            {cars.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-xl">No cars found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarListPage;
