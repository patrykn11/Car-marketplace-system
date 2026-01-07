import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';
import closeIcon from '../assets/close.png';

const CarCard = ({ car, isFavoriteInitial, onToggleFavorite }) => {
    const carData = car.carData || {};
    const { isAuthenticated, username, authFetch } = useAuth();
    const { subscribeToTopic, unsubscribeFromTopic } = useWebSocket();
    
    // Używamy propsa isFavoriteInitial jako wartości początkowej 
    const [isLiked, setIsLiked] = useState(isFavoriteInitial || false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsLiked(isFavoriteInitial);
    }, [isFavoriteInitial]);

    const handleToggleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!isAuthenticated) {
            alert("Log in to add to favorites!");
            return;
        }
        if (loading) return;

        setLoading(true);
        const previousState = isLiked;
        
        // Optymistyczna aktualizacja UI
        setIsLiked(!isLiked);

        try {
            let response;
            if (!previousState) {
                // Dodawanie do ulubionych
                response = await authFetch(`/api/favorites/${car.advertisementId}`, {
                    method: 'POST'
                });
            } else {
                // Usuwanie z ulubionych
                response = await authFetch(`/api/favorites/${car.advertisementId}`, {
                    method: 'DELETE'
                });
            }

            if (response.ok) {
                if (!previousState) {
                    subscribeToTopic(car.advertisementId);
                } else {
                    unsubscribeFromTopic(car.advertisementId);
                }

                if (onToggleFavorite) {
                    onToggleFavorite(car.advertisementId, !previousState);
                }
            } else {
                throw new Error("Failed to update favorite");
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
            setIsLiked(previousState); // Cofnij zmianę w razie błędu
            alert("Could not update favorites. Try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!window.confirm('Are you sure you want to delete this advertisement?')) return;

        try {
            const response = await authFetch(`/api/advertisements/remove/${car.advertisementId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to delete advertisement');
                alert('Failed to delete advertisement');
            }
        } catch (error) {
            console.error('Error deleting advertisement:', error);
            alert('Error deleting advertisement');
        }
    };

    const imageUrl = car.hasImage 
        ? `http://localhost:8000/api/advertisements/${car.advertisementId}/image`
        : "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60";

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 relative group">
            
            {/* Przycisk ulubionych - styl z B, ale warunek wyświetlania z A (brak własnego auta) */}
            {isAuthenticated && username !== car.username && (
                <button
                    onClick={handleToggleFavorite}
                    disabled={loading}
                    className="absolute top-2 left-2 z-20 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-all shadow-sm group/heart"
                    title={isLiked ? "Remove from favorites" : "Add to favorites"}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-6 w-6 transition-colors duration-300 ${
                            isLiked 
                                ? 'text-red-500 fill-red-500' 
                                : 'text-gray-400 dark:text-gray-300 fill-none group-hover/heart:text-red-400'
                        }`} 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            )}

            {/* Przyciski edycji/usuwania - widoczne tylko dla właściciela */}
            {isAuthenticated && username === car.username && (
                <div className="absolute top-2 right-2 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.location.href = `/edit-car/${car.advertisementId}`;
                        }}
                        className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-800/80 rounded-full transition-colors backdrop-blur-sm"
                        title="Edit Advertisement"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-300" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-800/80 rounded-full transition-colors backdrop-blur-sm"
                        title="Delete Advertisement"
                    >
                        <img src={closeIcon} alt="Delete" className="w-5 h-5" />
                    </button>
                </div>
            )}

            <Link to={`/cars/${car.advertisementId}`} className="block h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 relative">
                <img
                    src={imageUrl}
                    alt={`${carData.carBrand} ${carData.carModel}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </Link>

            <div className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">
                            {carData.carBrand} {carData.carModel}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 transition-colors">
                            {carData.productionYear} • {carData.mileage?.toLocaleString()} km
                        </p>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400 transition-colors">
                        {carData.price?.toLocaleString()} PLN
                    </span>
                    <Link
                        to={`/cars/${car.advertisementId}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;