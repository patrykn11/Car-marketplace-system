import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [displayedCars, setDisplayedCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]); 
    
    const { isAuthenticated, authFetch } = useAuth();
    const [searchParams] = useSearchParams();

    const [filterSortingBy, setFilterSortingBy] = useState("");
    const [filters, setFilters] = useState({
        brand: '', model: '', bodyType: '', minPrice: '', maxPrice: '', 
        minYear: '', maxYear: '', fuelType: '', transmission: '', 
        minMileage: '', maxMileage: '', keywords: ''
    });


    useEffect(() => {
        const fetchCars = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3333/api/advertisements');
                if (!response.ok) {
                    throw new Error('Failed to fetch advertisements');
                }
                const data = await response.json();

                setCars(data);

               
                const bodyTypeFromUrl = searchParams.get('bodyType');
                if (bodyTypeFromUrl) {
                    setFilters(prev => ({ ...prev, bodyType: bodyTypeFromUrl }));
                    const filteredData = data.filter(car => 
                        car.carData?.carBodyType === bodyTypeFromUrl
                    );
                    setDisplayedCars(filteredData);
                } else {
                    setDisplayedCars(data);
                }

            } catch (err) {
                console.error("Error fetching cars:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [searchParams]);
    useEffect(() => {
        const fetchFavorites = async () => {
            if (isAuthenticated) {
                try {
                    const response = await authFetch('http://localhost:3333/api/favorites'); 
                    if (response.ok) {
                        const data = await response.json();
                        setFavorites(data);
                    }
                } catch (error) {
                    console.error("Error fetching favorites: ", error);
                }
            } else {
                setFavorites([]);
            }
        };

        fetchFavorites();
    }, [isAuthenticated, authFetch]);

    const handleFavoriteToggle = (advertisementId, isLikedNow) => {
        setFavorites(prevIds => {
            if (isLikedNow) {
                return prevIds.includes(advertisementId) ? prevIds : [...prevIds, advertisementId];
            } else {
                return prevIds.filter(id => id !== advertisementId);
            }
        });
    };

    const uniqueBrands = [...new Set(cars.map(ad => ad.carData?.carBrand))].filter(Boolean).sort();
    
    const carsForModels = filters.brand 
        ? cars.filter(car => car.carData?.carBrand === filters.brand)
        : cars; 
    
    const uniqueModels = [...new Set(carsForModels.map(ad => ad.carData?.carModel))].filter(Boolean).sort();

    const handleSearchClick = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            if (filters.keywords) params.append('keywords', filters.keywords);
            if (filters.brand) params.append('brand', filters.brand);
            if (filters.model) params.append('model', filters.model);
            if (filters.bodyType) params.append('bodyType', filters.bodyType);
            if (filters.minPrice) params.append('minPrice', filters.minPrice);
            if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
            if (filters.minYear) params.append('minYear', filters.minYear);
            if (filters.maxYear) params.append('maxYear', filters.maxYear);
            if (filters.fuelType) params.append('fuelType', filters.fuelType);
            if (filters.transmission) params.append('transmission', filters.transmission);
            if (filters.minMileage) params.append('minMileage', filters.minMileage);
            if (filters.maxMileage) params.append('maxMileage', filters.maxMileage);

            const response = await fetch(`http://localhost:3333/api/advertisements/search?${params.toString()}`);

            if (!response.ok) {
                throw new Error('Search failed');
            }

            const data = await response.json();
            setDisplayedCars(data);
        } catch (err) {
            console.error("Search error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetClick = () => {
        setFilters({
            brand: '', model: '', bodyType: '', minPrice: '', maxPrice: '', 
            minYear: '', maxYear: '', fuelType: '', transmission: '', 
            minMileage: '', maxMileage: '', keywords: ''
        });
        setFilterSortingBy("");
        setDisplayedCars(cars);
    };

    if (loading) return <div className="flex justify-center items-center h-64 dark:text-white">Loading...</div>;
    if (error) return <div className="text-center text-red-600 p-8">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 transition-colors">Car Listings</h1>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6 mb-8 border border-transparent dark:border-gray-700 transition-colors duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors">Search Filters</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                value={filters.brand}
                                onChange={(e) => setFilters({ ...filters, brand: e.target.value, model: '' })}
                            >
                                <option value="">All brands</option>
                                {uniqueBrands.map((brandName, index) => (
                                    <option key={index} value={brandName}>{brandName}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Model</label>
                            <select 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                value={filters.model}
                                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                            >
                                <option value=''>All models</option>
                                {uniqueModels.map((carModel, index) => (
                                    <option key={index} value={carModel}>{carModel}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Body type</label>
                            <select
                                value={filters.bodyType} 
                                onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })} 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                <option value="">All types</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Coupe">Coupe</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Cabriolet">Cabriolet</option>
                                <option value="Van">Van</option>
                                <option value="Pickup">Pickup</option>
                                <option value="Wagon">Wagon</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price from (zł)</label>
                            <input 
                                type="number"
                                value={filters.minPrice} 
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                placeholder="0" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price to (zł)</label>
                            <input 
                                type="number" 
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                placeholder="999999" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year from</label>
                            <input 
                                type="number" 
                                value={filters.minYear}
                                onChange={(e) => setFilters({ ...filters, minYear: e.target.value })}
                                placeholder="2000" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Year to</label>
                            <input 
                                type="number"
                                value={filters.maxYear}
                                onChange={(e) => setFilters({ ...filters, maxYear: e.target.value })} 
                                placeholder="2024" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Fuel type</label>
                            <select
                                value={filters.fuelType}
                                onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })} 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                <option value="">All types</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                                <option value="Hybird">Hybrid</option>
                                <option value="LPG">LPG</option>
                                <option value="CNG">CNG</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Transmission</label>
                            <select
                                value={filters.transmission}
                                onChange={(e) => setFilters({ ...filters, transmission: e.target.value })} 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                <option value="">All types</option>
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Semi-automatic">Semi-automatic</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mileage from (km)</label>
                            <input 
                                type="number"
                                value={filters.minMileage}
                                onChange={(e) => setFilters({ ...filters, minMileage: e.target.value })}
                                placeholder="0"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mileage to (km)</label>
                            <input 
                                type="number" 
                                value={filters.maxMileage}
                                onChange={(e) => setFilters({ ...filters, maxMileage: e.target.value })} 
                                placeholder="999999" 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sort by</label>
                            <select
                                value={filterSortingBy}
                                onChange={e => setFilterSortingBy(e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            >
                                <option value="">Default</option>
                                <option value="Price ascending">Price ascending</option>
                                <option value="Price descending">Price descending</option>
                                <option value="Year ascending">Year ascending</option>
                                <option value="Year descending">Year descending</option>
                            </select>
                        </div>
                        <div className="col-span-full">
                            <label>Słowa kluczowe (AI Search)</label>
                            <input
                                type="text"
                                placeholder="np. sportowe auto z niskim spalaniem na dojazdy do pracy"
                                value={filters.keywords}
                                onChange={e => setFilters({...filters, keywords: e.target.value})}
                                className="..."
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <button onClick={handleSearchClick} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">Search</button>
                        <button onClick={handleResetClick} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-medium rounded-md transition-colors shadow-sm">Reset</button>
                    </div>
                </div>

                {displayedCars.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
                        <p className="text-xl text-gray-500 dark:text-gray-400">No cars found.</p>
                        <button onClick={handleResetClick} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">Clear filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedCars.map((car) => (
                            <CarCard 
                                key={car.advertisementId} 
                                car={car} 
                                isFavoriteInitial={favorites.includes(car.advertisementId)}
                                onToggleFavorite={handleFavoriteToggle}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarListPage;