import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [carBrands, setCarBrands] = useState([]);
    const { authFetch } = useAuth();

    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        minPrice: '',
        maxPrice: '',
        minYear: '',
        maxYear: '',
        fuelType: '',
        transmission: '',
        minMileage: '',
        maxMileage: ''
    });

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await authFetch('/api/advertisements');
                if (!response.ok) {
                    throw new Error('Failed to fetch advertisements');
                }
                const data = await response.json();
                const uniqueBrands = [...new Set(data.map(adv => adv.carData?.carBrand))].sort();
                setCars(data);
                setCarBrands(uniqueBrands);
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

            {/* Filter Panel */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Search Filters</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>All brands</option>
                            {carBrands.map((brandName, index) => (
                                <option key={index} value={brandName}>
                                    {brandName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>All models</option>
                            <option>Corolla</option>
                            <option>Camry</option>
                        </select>
                    </div>

                    {/* Price from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price from (zł)</label>
                        <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Price to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price to (zł)</label>
                        <input type="number" placeholder="999999" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Year from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year from</label>
                        <input type="number" placeholder="2000" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Year to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year to</label>
                        <input type="number" placeholder="2024" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Fuel type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel type</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>All types</option>
                            <option>Petrol</option>
                            <option>Diesel</option>
                            <option>LPG</option>
                            <option>Hybrid</option>
                            <option>Electric</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>All types</option>
                            <option>Manual</option>
                            <option>Automatic</option>
                            <option>CVT</option>
                        </select>
                    </div>

                    {/* Mileage from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage from (km)</label>
                        <input type="number" placeholder="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Mileage to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage to (km)</label>
                        <input type="number" placeholder="999999" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Sort by */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            <option>Newest</option>
                            <option>Price ascending</option>
                            <option>Price descending</option>
                            <option>Year descending</option>
                        </select>
                    </div>
                </div>

                {/* Przyciski */}
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                        Serach
                    </button>
                    <button className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 transition-colors">
                        Reset
                    </button>
                </div>
            </div>

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
