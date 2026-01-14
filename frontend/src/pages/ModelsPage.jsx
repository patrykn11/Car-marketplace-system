import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CarTile from '../components/CarTile';

const ModelsPage = () => {
  const { brandId } = useParams();
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/catalog/brands/${brandId}/models`)
      .then(res => setModels(res.data))
      .catch(err => console.error(err));
  }, [brandId]);

  return (
    <div className="container mx-auto px-4 py-10">
      <button
        onClick={() => navigate('/catalog')}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 transition-colors"
      >
        ← Return to brands
      </button>
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white transition-colors">
        Available models:
      </h2>

      {models.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          No models for this brand in the database.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((car) => (
            <CarTile
              key={car.id}
              car={car}
              onClick={(id) => navigate(`/catalog/details/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelsPage;