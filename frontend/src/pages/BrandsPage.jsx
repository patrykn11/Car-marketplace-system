import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/api/catalog/brands')
      .then(res => setBrands(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white transition-colors">
        Wybierz Markę
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            onClick={() => navigate(`/catalog/brand/${brand.id}`)}
            className="
              group
              bg-white dark:bg-gray-800 
              p-8 rounded-2xl 
              shadow-lg dark:shadow-gray-900/50
              hover:shadow-2xl hover:scale-105 
              transition-all duration-300 cursor-pointer
              flex flex-col items-center justify-center 
              border border-gray-100 dark:border-gray-700
              aspect-square
            "
          >
            <div className="bg-white rounded-xl p-4 mb-6 shadow-sm flex items-center justify-center w-full h-40">
                <img 
                  src={brand.logoUrl} 
                  alt={brand.name} 
                  className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 transition-colors">
                {brand.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;