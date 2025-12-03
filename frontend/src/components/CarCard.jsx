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
                <button
                    onClick={handleDelete}
                    className="absolute top-2 right-2 z-10 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Advertisement"
                >
                    <img src={closeIcon} alt="Delete" className="w-4 h-4" />
                </button>
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
