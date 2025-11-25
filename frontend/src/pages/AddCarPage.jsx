import React, {useState} from "react";

export default function AddCarPage() {
    const [car_brand, setCarBrand]              = useState("");
    const [car_model, setCarModel]              = useState("");
    const [production_year, setProductionYear]  = useState("");
    const [car_color, setCarColor]              = useState("");
    const [price, setPrice]                     = useState("");
    const [description, setDescription]         = useState("");

    async function addCar(ev) {
        ev.preventDefault();

        const response = await fetch('/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, price, description}),
        });

        if (response.ok) {
            alert('Ogłoszenie dodane pomyślnie');
            setTitle('');
            setDescription('');
        } else { 
            alert('Błąd przy dodawaniu ogłoszenia'); 
        }
    }

    return (
        <form onSubmit={addCar} className="max-w-md mx-auto p-4">
            <h2 className="text-2xl mb-4">Dodaj nowe ogłoszenie</h2>

            <label className="block mb-1">
                Brand:
                <input
                    type="text"
                    value={car_brand}
                    onChange={e => setCarBrand(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-1"
                    required
                />
            </label>

            <label className="block mb-1">
                Model:
                <input
                    type="text"
                    value={car_model}
                    onChange={e => setCarModel(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-1"
                    required
                />
            </label>

            <label className="block mb-1">
                Production Year:
                <select
                    value={production_year}
                    onChange={e => setProductionYear(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-1"
                    required
                >
                    <option value="">-- Wybierz rok --</option>
                    {Array.from({length: new Date().getFullYear() - 1950}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </label>

            <label className="block mb-1">
                Color:
                <input
                    type="text"
                    value={car_color}
                    onChange={e => setCarColor(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded mt-1"
                    required
                />
            </label>

            <label className="block mb-1">
                Price:
                    <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-400 rounded mt-1"
                        min="0"
                        step="1000"
                        required
                    />
            </label>

            <label className="block mb-1">
                Description:
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-400 rounded mt-1"
                        required
                    />
            </label>

            <div className="flex justify-center mt-4">
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white p-2 rounded px-6"
                >
                    Dodaj ogłoszenie
                </button>
            </div>
        </form>
    )
}