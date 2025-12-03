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
                    // take only 3 cars for featured
                    setFeaturedCars(data.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching featured cars:", error);
            }
        };

        fetchFeaturedCars();
    }, [authFetch]);

    return (
        <div className="space-y-12">
            <section className="text-center py-12 bg-blue-600 text-white rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Welcome to EITI MOTO{username ? `, ${username}` : ""}</h1>
                <p className="text-xl mb-8">Find your dream car today!</p>
                <Link
                    to="/cars"
                    className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                    Browse All Cars
                </Link>
            </section>

            <section>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Featured Cars</h2>
                {featuredCars.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredCars.map((car) => (
                            <CarCard key={car.advertisementId} car={car} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No featured cars available at the moment.</p>
                )}
            </section>
        </div>
    );
};

export default HomePage;
