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

  if (!car) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-black flex items-center gap-2 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="w-full h-80 md:h-96 bg-gray-200">
          <img 
            src={car.photoUrl || '/models/placeholder.jpg'} 
            alt={car.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-gray-500 text-lg font-medium">{car.brand?.name}</p>
              <h1 className="text-4xl font-bold text-gray-900">{car.name}</h1>
            </div>
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
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
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <div className="text-2xl mr-4">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value || '-'}</p>
    </div>
  </div>
);

export default ModelDetailsPage;