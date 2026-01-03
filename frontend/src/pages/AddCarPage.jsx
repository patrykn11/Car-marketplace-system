import React, { useState } from "react";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AddCarPage() {
    const { token, authFetch, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [carBrand, setCarBrand] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carBodyType, setCarBodyType] = useState("");
    const [productionYear, setProductionYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [transmission, setTransmission] = useState("");
    const [engineCapacity, setEngineCapacity] = useState("");
    const [power, setPower] = useState("");
    const [carColor, setCarColor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

    async function addCar(ev) {
        ev.preventDefault();

        if (!isAuthenticated) {
            alert("You must be logged in to add an advertisement");
            navigate('/login');
            return;
        }

        const carData = {
            carBrand, carModel, carBodyType,
            productionYear, price,
            mileage, fuelType,
            transmission, engineCapacity,
            power, carColor
        }

        const advertisementData = {
            title, description,
            location, carData
        }

        console.log("------------------------------------------------");
        console.log("🛠️ DEBUG: DANE WYSYŁANE DO BACKENDU:");
        console.log(JSON.stringify(advertisementData, null, 2)); 
        console.log("------------------------------------------------");

        try {
            const response = await authFetch('http://localhost:3333/api/advertisements/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(advertisementData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Success:", data);
                alert("Advertisement added successfully!");

                setTitle("");
                setCarBrand("");
                setCarModel("");
                setCarBodyType("");
                setProductionYear("");
                setMileage("");
                setFuelType("");
                setTransmission("");
                setEngineCapacity("");
                setPower("");
                setCarColor("");
                setPrice("");
                setDescription("");
                setLocation("");
                setDescription("");

                navigate('/');
            } else {
                const error = await response.text();
                console.error("Error:", response.status, error);
                alert(`Error adding advertisement: ${response.status}`);
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Error connecting to server");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden transition-colors duration-300">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-3xl font-bold text-white">Add New Advertisement</h2>
                        <p className="text-blue-100 mt-2">Fill in the form to list your car for sale</p>
                    </div>

                    <form onSubmit={addCar} className="p-8">
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center transition-colors">
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                                Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Advertisement Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="e.g. BMW 3 Series in great condition"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Price (PLN) *
                                    </label>
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        placeholder="50000"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        min="0"
                                        step="1000"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center transition-colors">
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                                Vehicle Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Brand *
                                    </label>
                                    <input
                                        type="text"
                                        value={carBrand}
                                        onChange={e => setCarBrand(e.target.value)}
                                        placeholder="BMW"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Model *
                                    </label>
                                    <input
                                        type="text"
                                        value={carModel}
                                        onChange={e => setCarModel(e.target.value)}
                                        placeholder="3 Series"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                 <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Body type *
                                    </label>
                                    <select
                                        value={carBodyType} 
                                        onChange={e => setCarBodyType(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    >
                                        <option value="">Select body type</option>
                                        <option value="Sedan">Sedan</option>
                                        <option value="Coupe">Coupe</option>
                                        <option value="SUV">SUV</option>
                                        <option value="Hatchback">Hatchback</option>
                                        <option value="Cabriolet">Cabriolet</option>
                                        <option value="Van">Van</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Production Year *
                                    </label>
                                    <select
                                        value={productionYear}
                                        onChange={e => setProductionYear(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Mileage (km) *
                                    </label>
                                    <input
                                        type="number"
                                        value={mileage}
                                        onChange={e => setMileage(e.target.value)}
                                        placeholder="120000"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Fuel Type *
                                    </label>
                                    <select
                                        value={fuelType}
                                        onChange={e => setFuelType(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Transmission *
                                    </label>
                                    <select
                                        value={transmission}
                                        onChange={e => setTransmission(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    >
                                        <option value="">Select transmission</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Automatic">Automatic</option>
                                        <option value="Semi-automatic">Semi-automatic</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Engine Capacity (L) *
                                    </label>
                                    <input
                                        type="number"
                                        value={engineCapacity}
                                        onChange={e => setEngineCapacity(e.target.value)}
                                        placeholder="2.0"
                                        step="0.1"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Power (HP) *
                                    </label>
                                    <input
                                        type="number"
                                        value={power}
                                        onChange={e => setPower(e.target.value)}
                                        placeholder="150"
                                        min="0"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Color *
                                    </label>
                                    <input
                                        type="text"
                                        value={carColor}
                                        onChange={e => setCarColor(e.target.value)}
                                        placeholder="Black"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        placeholder="Warsaw"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
                                                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center transition-colors">
                                <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                                Description
                            </h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Detailed Description *
                                </label>
                                <textarea
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="Describe the vehicle condition, service history, additional features..."
                                    rows="6"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none
                                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400"
                                    required
                                />
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 transition-colors">
                                    Minimum 50 characters. Be specific to increase chances of sale.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
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