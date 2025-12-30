import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';

const BODY_TYPES = [
    {
        name: "SUV",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l2-8h12l-2 8H4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 16h20" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l1.5 8H4.5L6 8z" />
            </svg>
        )
    },
    {
        name: "Sedan",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18l-3-6H6L3 12z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 16h20" />
                <circle cx="6" cy="18" r="2" />
                <circle cx="18" cy="18" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12v4" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12v4" />
            </svg>
        )
    },
    {
        name: "Hatchback",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 14l2-8h10l4 8" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 14v3" />
            </svg>
        )
    },
    {
        name: "Coupe",
        icon: (
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 14h20" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 14l3-7h14l3 7" />
                <circle cx="6" cy="17" r="2" />
                <circle cx="18" cy="17" r="2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v7" />
            </svg>
        )
    }
];

const HomePage = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [popularBrands, setPopularBrands] = useState([]);
    
    const [favoriteIds, setFavoriteIds] = useState([]); 

    const { username, authFetch, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const adsResponse = await fetch('http://localhost:3333/api/advertisements/popular');
                if (adsResponse.ok) {
                    const adsData = await adsResponse.json();
                    setFeaturedCars(adsData);
                }

                const brandsResponse = await fetch('http://localhost:8000/api/catalog/brands');
                if (brandsResponse.ok) {
                    const brandsData = await brandsResponse.json();
                    setPopularBrands(brandsData.slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching homepage data:", error);
            }
        };

        fetchHomeData();
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (isAuthenticated) {
                try {
                    const response = await authFetch('http://localhost:3333/api/favorites'); 
                    if (response.ok) {
                        const data = await response.json();
                        setFavoriteIds(data);
                    }
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            } else {
                setFavoriteIds([]);
            }
        };

        fetchFavorites();
    }, [isAuthenticated, authFetch]);

    return (
        <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <section className="text-center py-20 bg-blue-600 dark:bg-blue-700 text-white rounded-3xl shadow-xl dark:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Welcome to EITI MOTO{username ? `, ${username}` : ""}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-2xl mx-auto">
                        Discover the best cars, compare prices, and find your dream ride today!
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/cars"
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            Browse All Cars
                        </Link>
                        {!username && (
                            <Link
                                to="/register"
                                className="bg-blue-500 border border-blue-400 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all duration-300"
                            >
                                Join Us
                            </Link>
                        )}
                    </div>
                </div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Popular Brands
                    </h2>
                    <Link to="/catalog" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        View all brands &rarr;
                    </Link>
                </div>
                
                {popularBrands.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {popularBrands.map((brand) => (
                            <div 
                                key={brand.id}
                                onClick={() => navigate(`/catalog/brand/${brand.id}`)}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 cursor-pointer transition-all duration-300 flex flex-col items-center group"
                            >
                                <div className="h-20 w-full flex items-center justify-center mb-4">
                                    <img 
                                        src={brand.logoUrl} 
                                        alt={brand.name} 
                                        className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" 
                                    />
                                </div>
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{brand.name}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">Loading brands...</p>
                )}
            </section>

            <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                    Browse by Body Type
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {BODY_TYPES.map((type) => (
                        <div 
                            key={type.name}
                            onClick={() => navigate(`/cars?bodyType=${type.name}`)}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-700/50 cursor-pointer transition-all duration-300 flex flex-col items-center gap-3 group"
                        >
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {type.icon}
                            </div>
                            <span className="text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {type.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Most Popular Listings
                    </h2>
                    <Link to="/cars" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        View all listings &rarr;
                    </Link>
                </div>

                {featuredCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car) => (
                            <CarCard 
                                key={car.advertisementId} 
                                car={car} 
                                isFavoriteInitial={favoriteIds.includes(car.advertisementId)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 transition-colors">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No featured cars available at the moment.
                        </p>
                        <Link to="/add-car" className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-2 inline-block">
                            Be the first to add one!
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
};

export default HomePage;