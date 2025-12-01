import React, { useState } from "react";

export default function AddCarPage() {
    const [title, setTitle] = useState("");
    const [car_brand, setCarBrand] = useState("");
    const [car_model, setCarModel] = useState("");
    const [production_year, setProductionYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuel_type, setFuelType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engine_capacity, setEngineCapacity] = useState("");
    const [power, setPower] = useState("");
    const [car_color, setCarColor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    async function addCar(ev) {
        ev.preventDefault();

        const carData = {
            title,
            car_brand,
            car_model,
            production_year: parseInt(production_year),
            mileage: parseInt(mileage),
            fuel_type,
            transmission,
            engine_capacity: parseFloat(engine_capacity),
            power: parseInt(power),
            car_color,
            price: parseFloat(price),
            description,
            location
        };

        const response = await fetch('http://localhost:3333/api/advertisements/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });

        if (response.ok) {
            alert('Advertisement added successfully');
            
            setTitle('');
            setCarBrand('');
            setCarModel('');
            setProductionYear('');
            setMileage('');
            setFuelType('');
            setTransmission('');
            setEngineCapacity('');
            setPower('');
            setCarColor('');
            setPrice('');
            setDescription('');
            setLocation('');

            navigate('/');
        } else {
            alert('Error adding advertisement');
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white">Add New Advertisement</h2>
                        <p className="text-blue-100 mt-2">Fill in the form to list your car for sale</p>
                    </div>

                    <form onSubmit={addCar} className="p-8">
                        {/* Basic Info Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Advertisement Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="e.g. BMW 3 Series in great condition"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price (PLN) *
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        placeholder="50000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        min="0"
                                        step="1000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Car Details Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                                Vehicle Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Brand *
                                    </label>
                                    <input
                                        type="text"
                                        value={car_brand}
                                        onChange={e => setCarBrand(e.target.value)}
                                        placeholder="BMW"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Model *
                                    </label>
                                    <input
                                        type="text"
                                        value={car_model}
                                        onChange={e => setCarModel(e.target.value)}
                                        placeholder="3 Series"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Production Year *
                                    </label>
                                    <select
                                        value={production_year}
                                        onChange={e => setProductionYear(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    >
                                        <option value="">Select year</option>
                                        {Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mileage (km) *
                                    </label>
                                    <input
                                        type="number"
                                        value={mileage}
                                        onChange={e => setMileage(e.target.value)}
                                        placeholder="120000"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fuel Type *
                                    </label>
                                    <select
                                        value={fuel_type}
                                        onChange={e => setFuelType(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    >
                                        <option value="">Select fuel type</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="Electric">Electric</option>
                                        <option value="Hybrid">Hybrid</option>
                                        <option value="LPG">LPG</option>
                                        <option value="CNG">CNG</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Transmission *
                                    </label>
                                    <select
                                        value={transmission}
                                        onChange={e => setTransmission(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    >
                                        <option value="">Select transmission</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Semi-automatic">Semi-automatic</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Engine Capacity (L) *
                                    </label>
                                    <input
                                        type="number"
                                        value={engine_capacity}
                                        onChange={e => setEngineCapacity(e.target.value)}
                                        placeholder="2.0"
                                        step="0.1"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Power (HP) *
                                    </label>
                                    <input
                                        type="number"
                                        value={power}
                                        onChange={e => setPower(e.target.value)}
                                        placeholder="150"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Color *
                                    </label>
                                    <input
                                        type="text"
                                        value={car_color}
                                        onChange={e => setCarColor(e.target.value)}
                                        placeholder="Black"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        placeholder="Warsaw"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                                Description
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Describe the vehicle condition, service history, additional features..."
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-2">
                                    Minimum 50 characters. Be specific to increase chances of sale.
                                </p>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition shadow-lg"
                            >
                                Add Advertisement
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}