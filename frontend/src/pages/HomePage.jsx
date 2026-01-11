import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import AppTutorial from '../components/AppTutorial';
import { useAuth } from '../contexts/AuthContext';

const BODY_TYPES = [
    { name: "SUV", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l2-8h12l-2 8H4z" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>) },
    { name: "Sedan", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18l-3-6H6L3 12z" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>) },
    { name: "Hatchback", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 14h16" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>) },
    { name: "Coupe", icon: (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2 14h20" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></svg>) }
];

const BRAND_ADS = [
    { id: 1, name: "BMW", slogan: "Sheer Driving Pleasure", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", link: "/cars?brand=BMW", theme: "from-blue-600 to-blue-800" },
    { id: 2, name: "Audi", slogan: "Vorsprung durch Technik", logo: "https://logowik.com/content/uploads/images/562_audi.jpg", link: "/cars?brand=Audi", theme: "from-gray-800 to-gray-900" },
    { id: 3, name: "Mercedes-Benz", slogan: "The Best or Nothing", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", link: "/cars?brand=Mercedes", theme: "from-black to-gray-800" },
    { id: 4, name: "Tesla", slogan: "Electric Future", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", link: "/cars?brand=Tesla", theme: "from-red-600 to-red-800" },
    { id: 5, name: "Toyota", slogan: "Let's Go Places", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg", link: "/cars?brand=Toyota", theme: "from-red-500 to-red-700" }
];

const HomePage = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [popularBrands, setPopularBrands] = useState([]);
    const [recommendedCars, setRecommendedCars] = useState([]);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [brandAd, setBrandAd] = useState(null);

    const { username, authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeData = async () => {
            const adsRes = await fetch('http://localhost:8000/api/advertisements/popular');
            if (adsRes.ok) setFeaturedCars(await adsRes.json());
            const brandsRes = await fetch('http://localhost:8000/api/catalog/brands');
            if (brandsRes.ok) {
                const data = await brandsRes.json();
                setPopularBrands(data.slice(0, 4));
            }
        };
        fetchHomeData();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            authFetch('http://localhost:8000/api/favorites')
                .then(r => r.ok && r.json().then(setFavoriteIds));
            authFetch('http://localhost:8000/api/advertisements/recommendations')
                .then(r => r.ok && r.json().then(setRecommendedCars));
        } else {
            setFavoriteIds([]);
            setRecommendedCars([]);
        }
    }, [isAuthenticated, authFetch]);

    useEffect(() => {
        const fetchBrandAd = async () => {
            if (isAuthenticated) {
                try {
                    const res = await authFetch('http://localhost:8000/api/Ad');
                    const favBrand = await res.text();
                    console.log("Car brand:", favBrand);
                    const ad = BRAND_ADS.find(a => a.name.toLowerCase() === favBrand.toLowerCase());
                    if (ad) setBrandAd(ad);
                    else setBrandAd(BRAND_ADS[Math.floor(Math.random() * BRAND_ADS.length)]);
                } catch (err) {
                    console.error(err);
                    setBrandAd(BRAND_ADS[Math.floor(Math.random() * BRAND_ADS.length)]);
                }
            } else {
                setBrandAd(BRAND_ADS[Math.floor(Math.random() * BRAND_ADS.length)]);
            }
        };
        fetchBrandAd();
    }, [isAuthenticated]);

    return (
        <div className="w-full max-w-[98%] mx-auto py-6 px-2">
            <AppTutorial />
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                <aside id="most-popular-section" className="xl:col-span-3 order-2 xl:order-1 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Popular Listings</h2>
                        <Link to="/cars" className="text-blue-600 text-sm hover:underline">View all</Link>
                    </div>
                    <div className="flex flex-col gap-6">
                        {featuredCars.length > 0 ? (
                            featuredCars.map(car => (
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

                <main className="xl:col-span-6 order-1 xl:order-2 space-y-8">
                    <section id="welcome-banner" className="text-center py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-3xl shadow-xl relative overflow-hidden">
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

                    {brandAd && (
                        <section
                            onClick={() => navigate(brandAd.link)}
                            className={`cursor-pointer bg-gradient-to-br ${brandAd.theme} text-white rounded-3xl p-8 shadow-xl hover:scale-[1.02] transition-all`}
                        >
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div>
                                    <span className="inline-block bg-white/20 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        Sponsored Brand
                                    </span>
                                    <h2 className="text-3xl font-extrabold tracking-tight">
                                        {brandAd.name}
                                    </h2>
                                    <p className="text-lg opacity-90 mt-2">
                                        {brandAd.slogan}
                                    </p>
                                </div>
                                <img
                                    src={brandAd.logo}
                                    alt={brandAd.name}
                                    className="h-20 bg-white p-4 rounded-2xl"
                                />
                            </div>
                        </section>
                    )}

                    <section>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Popular Brands</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {popularBrands.map(brand => (
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

                    <section>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Body Types</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {BODY_TYPES.map(type => (
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

                <aside id="for-you-section" className="xl:col-span-3 order-3 flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">For You</h2>
                    </div>

                    {isAuthenticated ? (
                        recommendedCars.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {recommendedCars.map(car => (
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