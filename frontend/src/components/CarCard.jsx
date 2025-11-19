import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    {car.make} {car.model}
                </h3>
                <p className="text-gray-600 text-sm mb-2">
                    {car.year} • {car.mileage.toLocaleString()} km
                </p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-blue-600">
                        {car.price.toLocaleString()} PLN
                    </span>
                    <Link
                        to={`/cars/${car.id}`}
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
