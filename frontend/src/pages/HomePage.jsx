import { Link } from 'react-router-dom';
import { mockCars } from '../data/mockCars';
import CarCard from '../components/CarCard';

const HomePage = () => {
    const featuredCars = mockCars.slice(0, 3);

    return (
        <div className="space-y-12">
            <section className="text-center py-12 bg-blue-600 text-white rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold mb-4">Welcome to EITI MOTO</h1>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredCars.map((car) => (
                        <CarCard key={car.id} car={car} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
