import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import closeIcon from '../assets/close.png';

const CarCard = ({ car }) => {
    const carData = car.carData || {};
    const { isAuthenticated, username, authFetch } = useAuth();

    const handleDelete = async (e) => {
        e.preventDefault(); // Prevent link navigation if wrapped in Link (though button is outside link here, good practice)
        if (!window.confirm('Are you sure you want to delete this advertisement?')) return;

        try {
            const response = await authFetch(`http://localhost:3333/api/advertisements/remove/${car.advertisementId}`, {
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

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
            {isAuthenticated && username === car.username && (
                <div className="absolute top-2 right-2 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => window.location.href = `/edit-car/${car.advertisementId}`}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                        title="Edit Advertisement"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors"
                        title="Delete Advertisement"
                    >
                        <img src={closeIcon} alt="Delete" className="w-5 h-5" />
                    </button>
                </div>
            )}

            <img
                src={car.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"}
                alt={`${carData.carBrand} ${carData.carModel}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {carData.carBrand} {carData.carModel}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                    {carData.productionYear} • {carData.mileage?.toLocaleString()} km
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">
                        {carData.price?.toLocaleString()} PLN
                    </span>
                    <Link
                        to={`/cars/${car.advertisementId}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CarCard;
