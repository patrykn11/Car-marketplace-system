import React from "react";

const CarFilms = () => {
  // Wpisz tu ręcznie wszystkie linki do YouTube
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
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Video Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videoIds.map((id, index) => (
          <div key={index} style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={`YouTube video ${index}`}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFilms;