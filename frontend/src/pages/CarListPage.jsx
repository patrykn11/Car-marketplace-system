import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

const CarListPage = () => {
    const [cars, setCars] = useState([]);
    const [displayedCars, setDisplayedCars] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authFetch } = useAuth();

    const [filterSortingBy, setFilterSortingBy] = useState("");
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

                setCars(data);
                setDisplayedCars(data);
            } catch (err) {
                console.error("Error fetching cars:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, [authFetch]);

    const uniqueBrands = [...new Set(cars.map(ad => ad.carData?.carBrand))].filter(Boolean).sort();

    const carsForModels = filters.brand 
        ? cars.filter(car => car.carData?.carBrand === filters.brand)
        : cars; 
    
    const uniqueModels = [...new Set(carsForModels.map(ad => ad.carData?.carModel))].filter(Boolean).sort();

    const filteredCars = cars.filter(car => {
        if (filters.brand && car.carData?.carBrand !== filters.brand) return false;
        if (filters.model && car.carData?.carModel !== filters.model) return false;
        
        return true;
    });

    const handleSearchClick = () => {
        let result = [...cars];

        if (filters.brand) {
        result = result.filter(car => car.carData?.carBrand === filters.brand);
        }
        if (filters.model) {
            result = result.filter(car => car.carData?.carModel === filters.model);
        }
        if (filters.minPrice) {
            result = result.filter(car => Number(car.carData?.price) >= Number(filters.minPrice));
        }
        if (filters.maxPrice) {
            result = result.filter(car => Number(car.carData?.price) <= Number(filters.maxPrice));
        }
        if (filters.minYear) {
            result = result.filter(car => Number(car.carData?.productionYear) >= Number(filters.minYear));
        }
        if (filters.maxYear) {
            result = result.filter(car => Number(car.carData?.productionYear) <= Number(filters.maxYear));
        }
        if (filters.fuelType) {
            result = result.filter(car => car.carData?.fuelType === filters.fuelType);
        }
        if (filters.transmission) {
            result = result.filter(car => car.carData?.transmission === filters.transmission);
        }
        if (filters.minMileage) {
            result = result.filter(car => Number(car.carData?.mileage) >= Number(filters.minMileage));
        }
        if (filters.maxMileage) {
            result = result.filter(car => Number(car.carData?.mileage) <= Number(filters.maxMileage));
        }

        if (filterSortingBy) {
            switch (filterSortingBy) {
                case "Price ascending":
                    result.sort((a, b) => Number(a.carData?.price) - Number(b.carData?.price));
                    break;
                case "Price descending":
                    result.sort((a, b) => Number(b.carData?.price) - Number(a.carData?.price));
                    break;
                case "Year ascending":
                    result.sort((a, b) => Number(a.carData?.productionYear) - Number(b.carData?.productionYear));
                    break;
                case "Year descending":
                    result.sort((a, b) => Number(b.carData?.productionYear) - Number(a.carData?.productionYear));
                    break;
                default:
                    break;
            }
        }

        setDisplayedCars(result);
    }
    const handleResetClick = () => {
        setFilters({
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
        setFilterSortingBy("");

        setDisplayedCars(cars);
    };


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
                        <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={filters.brand}
                            onChange={(e) => setFilters({
                                ...filters,
                                brand: e.target.value,
                                model: ''
                            })}
                        >
                            <option value="">All brands</option>
                            {uniqueBrands.map((brandName, index) => (
                                <option key={index} value={brandName}>
                                    {brandName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                        <select 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={filters.model}
                            onChange={(e) => setFilters({
                                ...filters,
                                model: e.target.value
                            })}
                        >
                            <option value=''>All models</option>
                            {uniqueModels.map((carModel, index) => (
                                <option key={index} value={carModel}>
                                    {carModel}
                                </option>
                            ))}
    
                        </select>
                    </div>

                    {/* Price from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price from (zł)</label>
                        <input 
                            type="number"
                            value={filters.minPrice} 
                            onChange={(e) => setFilters({
                                ...filters,
                                minPrice: e.target.value
                            })}
                            placeholder="0" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>

                    {/* Price to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price to (zł)</label>
                        <input 
                            type="number" 
                            value={filters.maxPrice}
                            onChange={(e) => setFilters({
                                ...filters,
                                maxPrice: e.target.value
                            })}
                            placeholder="999999" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Year from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year from</label>
                        <input 
                            type="number" 
                            value={filters.minYear}
                            onChange={(e) => setFilters({
                                ...filters,
                                minYear: e.target.value
                            })}
                            placeholder="2000" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Year to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Year to</label>
                        <input 
                            type="number"
                            value={filters.maxYear}
                            onChange={(e) => setFilters({
                                ...filters,
                                maxYear: e.target.value
                            })} 
                            placeholder="2024" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Fuel type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fuel type</label>
                        <select
                            value={filters.fuelType}
                            onChange={(e) => setFilters({
                                ...filters,
                                fuelType: e.target.value
                            })} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
                        <select
                            value={filters.transmission}
                            onChange={(e) => setFilters({
                                ...filters,
                                transmission: e.target.value
                            })} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All types</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                            <option value="Semi-automatic">Semi-automatic</option>
                        </select>
                    </div>

                    {/* Mileage from */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage from (km)</label>
                        <input 
                            type="number"
                            value={filters.minMileage}
                            onChange={(e) => setFilters({
                                ...filters,
                                minMileage: e.target.value
                            })}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                        />
                    </div>

                    {/* Mileage to */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mileage to (km)</label>
                        <input 
                            type="number"
                            value={filters.maxMileage}
                            onChange={(e) => setFilters({
                                ...filters,
                                maxMileage: e.target.value
                            })} 
                            placeholder="999999" 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>

                    {/* Sort by */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                        <select
                            value={filterSortingBy}
                            onChange={e => setFilterSortingBy(e.target.value)} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All types</option>
                            <option value="Price ascending">Price ascending</option>
                            <option value="Price descending">Price descending</option>
                            <option value="Year ascending">Year ascending</option>
                            <option value="Year descending">Year descending</option>
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        onClick={handleSearchClick}
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Serach
                    </button>
                    <button
                        onClick={handleResetClick}
                        className="px-6 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 transition-colors"
                    >
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
                    {displayedCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CarListPage;
