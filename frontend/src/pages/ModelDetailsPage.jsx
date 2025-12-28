import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ModelDetailsPage = () => {
  const { modelId } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/catalog/models/${modelId}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [modelId]);

  if (!car) return <div className="text-center mt-10 dark:text-white">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl transition-colors duration-300">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/50 overflow-hidden border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        
        <div className="w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 relative">
          <img 
            src={car.photoUrl || '/models/placeholder.jpg'} 
            alt={car.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 dark:opacity-40 pointer-events-none" />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium transition-colors">
                {car.brand?.name}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white transition-colors">
                {car.name}
              </h1>
            </div>
            <span className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transition-colors">
              {car.productionYearStart} - {car.productionYearEnd || 'Present'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <SpecItem label="Engine / Fuel" value={car.engineType} icon="⛽" />
            <SpecItem label="Horse Power" value={`${car.horsePower} HP`} icon="⚡" />
            <SpecItem label="Production Year Start" value={car.productionYearStart} icon="📅" />
            <SpecItem label="Catalog ID" value={`#${car.id}`} icon="🆔" />
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ label, value, icon }) => (
  <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300 border border-transparent dark:border-gray-600">
    <div className="text-2xl mr-4">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide transition-colors">
        {label}
      </p>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors">
        {value || '-'}
      </p>
    </div>
  </div>
);

export default ModelDetailsPage;