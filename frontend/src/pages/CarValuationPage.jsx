import React, { useState } from "react"
import { api } from "../apiClient.js"

const CAR_DATA = {
    "Toyota": ["Corolla", "Yaris", "Auris", "Avensis", "Highlander"],
    "BMW": ["Series 3", "Series 5", "Series 7", "X3", "X5", "M5 z downpipe'ami"],
    "Audi": ["A3", "A4", "A5", "S3", "RS3", "S4", "RS4", "RS7"],
    "Mercedes": ["CLA", "A class", "B class", "C class", "E class", "CLS", "CLE"],
    "Opel": ["Insignia", "Vectra", "Astra", "Mokka", "Grandland", "Corsa"]
}

const YEARS = Array.from({length: 26}, (_, i) => 2025 - i)
const FUEL_TYPES = ["Gasoline", "Diesel", "Hybrid", "Electric"]

const CarValuationPage = () => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        productionYear: '',
        mileage: '',
        fuelType: ''
    })

    const [valuation, setValuation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'brand' ? { model: '' } : {})
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null);
        setValuation(null);

        if(!formData.brand || !formData.model || !formData.productionYear || !formData.mileage || !formData.fuelType ) {
            setError("Fill in all required fields!")
            setLoading(false)
            return
        }

        try {
            const response = await api.post("/valuation/calculate", {
                brand: formData.brand,
                model: formData.model,
                productionYear: formData.productionYear,
                mileage: formData.mileage,
                fuelType: formData.fuelType
            })

            const result = response.data.price || response.data
            setValuation(result)
        } catch (err) {
            console.error("Valuation error:", err)
            const mockPrice = Math.floor(Math.random() * (90000 - 5000) + 5000);
            setValuation(mockPrice);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-10 px-4 transition-colors duration-300">
            <div className="max-w-4xl mx-auto space-y-8">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors">Car Valuation</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors">Find out how much your car is worth!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 transition-colors duration-300">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Car parameters</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Brand</label>
                                    <select
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition-all 
                                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Choose brand</option>
                                        {Object.keys(CAR_DATA).map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
                                    <select
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        disabled={!formData.brand}
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition-all 
                                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                                   disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-500"
                                    >
                                        <option value="">Choose model</option>
                                        {formData.brand && CAR_DATA[formData.brand].map(model => (
                                            <option key={model} value={model}>{model}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Production year</label>
                                    <select
                                        name="productionYear"
                                        value={formData.productionYear}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition-all 
                                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Choose year</option>
                                        {YEARS.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fuel</label>
                                    <select
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition-all 
                                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="">Choose fuel type</option>
                                        {FUEL_TYPES.map(fuel => (
                                            <option key={fuel} value={fuel}>{fuel}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mileage (km)</label>
                                    <input
                                        type="number"
                                        name="mileage"
                                        value={formData.mileage}
                                        onChange={handleInputChange}
                                        placeholder="np. 150000"
                                        className="w-full rounded-xl border border-gray-300 p-3 outline-none transition-all 
                                                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                                                   bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white 
                                                   dark:[color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl text-sm transition-colors">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:bg-blue-300 dark:disabled:bg-blue-800"
                            >
                                {loading ? "Counting..." : "Submit and value"}
                            </button>
                        </form>
                    </div>

                    <div className="md:col-span-1">
                        <div className={`h-full rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 flex flex-col items-center justify-center text-center transition-all duration-500 
                            ${valuation 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-300'
                            }`}>

                            {valuation !== null ? (
                                <div className="animate-fade-in-up">
                                    <p className="text-blue-100 text-lg mb-2">Estimated value:</p>
                                    <div className="text-5xl font-bold mb-4">
                                        {valuation.toLocaleString()} PLN
                                    </div>
                                    <p className="text-sm text-blue-200 opacity-80">
                                        The valuation is approximate and depends on the technical condition of the vehicle.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto text-gray-400 dark:text-gray-300 transition-colors">
                                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="font-medium">Fill out the form to see the quote.</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarValuationPage