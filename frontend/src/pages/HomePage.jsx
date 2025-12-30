import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import { useAuth } from '../contexts/AuthContext';

// Ikony dla Body Types
const BODY_TYPES = [
    {
        name: "SUV",
        icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l2-8h12l-2 8H4z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 16h20" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l1.5 8H4.5L6 8z" /></svg>)
    },
    {
        name: "Sedan",
        icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18l-3-6H6L3 12z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 16h20" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M5 12v4" /><path strokeLinecap="round" strokeLinejoin="round" d="M19 12v4" /></svg>)
    },
    {
        name: "Hatchback",
        icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 14h16" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 14l2-8h10l4 8" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 14v3" /></svg>)
    },
    {
        name: "Coupe",
        icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2 14h20" /><path strokeLinecap="round" strokeLinejoin="round" d="M2 14l3-7h14l3 7" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 7v7" /></svg>)
    }
];

const HomePage = () => {
    // State
    const [featuredCars, setFeaturedCars] = useState([]);
    const [popularBrands, setPopularBrands] = useState([]);
    const [recommendedCars, setRecommendedCars] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);

    const { username, authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // 1. Fetch Public Data
    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                const adsResponse = await fetch('http://localhost:3333/api/advertisements/popular');
                if (adsResponse.ok) setFeaturedCars(await adsResponse.json());

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

    // 2. Fetch Private Data
    useEffect(() => {
        const fetchPrivateData = async () => {
            if (isAuthenticated) {
                try {
                    const favResponse = await authFetch('http://localhost:3333/api/favorites');
                    if (favResponse.ok) setFavoriteIds(await favResponse.json());

                    const recResponse = await authFetch('http://localhost:3333/api/advertisements/recommendations');
                    if (recResponse.ok) setRecommendedCars(await recResponse.json());
                } catch (error) {
                    console.error("Error fetching private data:", error);
                }
            } else {
                setFavoriteIds([]);
                setRecommendedCars([]);
            }
        };
        fetchPrivateData();
    }, [isAuthenticated, authFetch]);

    return (
        // Używamy width: 98% aby wykorzystać prawie cały ekran
        <div className="w-full max-w-[98%] mx-auto py-6 px-2">
            
            {/* GRID GŁÓWNY: 3 KOLUMNY (Na dużych ekranach) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

                {/* --- LEWA KOLUMNA: MOST POPULAR (Szerokość: 3/12) --- */}
                <aside className="xl:col-span-3 order-2 xl:order-1 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Listings</h2>
                        <Link to="/cars" className="text-blue-600 text-sm hover:underline">View all</Link>
                    </div>
                    
                    {/* Lista pionowa popularnych */}
                    <div className="flex flex-col gap-6">
                        {featuredCars.length > 0 ? (
                            featuredCars.map((car) => (
                                <CarCard 
                                    key={car.advertisementId} 
                                    car={car} 
                                    isFavoriteInitial={favoriteIds.includes(car.advertisementId)}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No popular cars found.</p>
                        )}
                    </div>
                </aside>

                {/* --- ŚRODKOWA KOLUMNA: BANNER & KATEGORIE (Szerokość: 6/12) --- */}
                <main className="xl:col-span-6 order-1 xl:order-2 space-y-8">
                    
                    {/* Hero Banner */}
                    <section className="text-center py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl shadow-xl relative overflow-hidden">
                        <div className="relative z-10 px-4">
                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
                                Welcome, {username || "Guest"}!
                            </h1>
                            <p className="text-lg text-blue-100 mb-8 max-w-lg mx-auto">
                                Find your dream car or sell your current one with EITI MOTO.
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link to="/cars" className="bg-white text-blue-700 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                                    Browse Cars
                                </Link>
                                {!username && (
                                    <Link to="/register" className="bg-blue-500 border border-blue-400 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">
                                        Join Now
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Popular Brands (W środku) */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popular Brands</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {popularBrands.map((brand) => (
                                <div 
                                    key={brand.id}
                                    onClick={() => navigate(`/catalog/brand/${brand.id}`)}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-center h-32"
                                >
                                    <img src={brand.logoUrl} alt={brand.name} className="h-12 object-contain mb-2" />
                                    <span className="font-semibold text-gray-700 dark:text-gray-200 text-sm">{brand.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Body Types (W środku) */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Body Types</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {BODY_TYPES.map((type) => (
                                <div 
                                    key={type.name}
                                    onClick={() => navigate(`/cars?bodyType=${type.name}`)}
                                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col items-center justify-center h-32 group"
                                >
                                    <div className="text-blue-500 mb-2 group-hover:scale-110 transition-transform">{type.icon}</div>
                                    <span className="font-medium text-gray-700 dark:text-gray-200 text-sm">{type.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* --- PRAWA KOLUMNA: FOR YOU (Szerokość: 3/12) --- */}
                <aside className="xl:col-span-3 order-3 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">For You</h2>
                    </div>

                    {isAuthenticated ? (
                        // ZALOGOWANY
                        recommendedCars.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {recommendedCars.map((car) => (
                                    <CarCard 
                                        key={car.advertisementId} 
                                        car={car} 
                                        isFavoriteInitial={favoriteIds.includes(car.advertisementId)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-gray-700 text-center">
                                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                                    We are learning your taste... Like some cars to see recommendations here!
                                </p>
                            </div>
                        )
                    ) : (
                        // NIEZALOGOWANY
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-center sticky top-24">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">🔒</div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Personalized Picks</h3>
                            <p className="text-gray-500 text-xs mb-4">Log in to see cars selected just for you!</p>
                            <Link to="/login" className="block w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 mb-2">Log In</Link>
                            <Link to="/register" className="block w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Register</Link>
                        </div>
                    )}
                </aside>

            </div>
        </div>
    );
};

export default HomePage;