import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    const carData = car.carData || {};

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
