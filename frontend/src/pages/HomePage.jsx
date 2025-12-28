import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard'; 
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const { username, authFetch } = useAuth();

    useEffect(() => {
        const fetchFeaturedCars = async () => {
            try {
                const response = await authFetch('http://localhost:3333/api/advertisements');
                if (response.ok) {
                    const data = await response.json();
                    setFeaturedCars(data.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching featured cars:", error);
            }
        };

        fetchFeaturedCars();
    }, [authFetch]);

    return (
        <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            <section className="text-center py-16 bg-blue-600 dark:bg-blue-700 text-white rounded-3xl shadow-xl dark:shadow-blue-900/20 transition-all duration-300">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                    Welcome to EITI MOTO{username ? `, ${username}` : ""}
                </h1>
                <p className="text-xl md:text-2xl mb-10 text-blue-100">
                    Find your dream car today!
                </p>
                <Link
                    to="/cars"
                    className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                    Browse All Cars
                </Link>
            </section>

            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                        Featured Cars
                    </h2>
                    <Link to="/cars" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        View all &rarr;
                    </Link>
                </div>

                {featuredCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car) => (
                            <CarCard key={car.advertisementId} car={car} />
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