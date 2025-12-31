import React from "react";

const CarFilms = () => {
  const videoUrls = [
    "https://www.youtube.com/watch?v=ckJaRjgf2aw",
    "https://www.youtube.com/watch?v=dH0pldINYbo",
    "https://www.youtube.com/watch?v=fPYho_m142c"
  ];

  const videoIds = videoUrls.map(url => {
    const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }).filter(id => id);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Video Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoIds.map((id, index) => (
            <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-gray-900/50 transition-all duration-300"
            >
              <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`YouTube video ${index}`}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            
              <div className="p-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Car Review #{index + 1}
                  </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarFilms;