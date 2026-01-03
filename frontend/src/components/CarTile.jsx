import React from 'react';

const CarTile = ({ car, onClick }) => {
  const imageUrl = car.photoUrl || '/models/placeholder.jpg'; 

  return (
    <div 
      onClick={() => onClick(car.id)}
      className="
        group   
        bg-white dark:bg-gray-800 
        border border-gray-100 dark:border-gray-700
        rounded-xl 
        shadow-md 
        hover:shadow-2xl dark:hover:shadow-gray-900/50 
        hover:-translate-y-1 
        transition-all 
        duration-300 
        cursor-pointer 
        overflow-hidden 
      "
    >
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`${car.brand?.name} ${car.name}`}
          className="
            w-full 
            h-full 
            object-cover 
            group-hover:scale-105 
            transition-transform 
            duration-500
          "
        />
        {car.engineType && (
            <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                {car.engineType}
            </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide transition-colors">
              {car.brand?.name || 'Brand'}
            </p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 transition-colors">
              {car.name}
            </h3>
          </div>
          
          <div className="bg-blue-50 text-blue-700 border border-blue-100 
                          dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 
                          text-xs font-bold px-2 py-1 rounded-md transition-colors">
            {car.productionYearStart}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 my-3 transition-colors"></div>

        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 transition-colors">
            <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{car.horsePower} HP</span>
            </div>

             <div className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span>{car.engineType}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CarTile;