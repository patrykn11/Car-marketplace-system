import React from "react";

const FeaturedVideoPage = () => {
  const videoId = "OeqnfffFbZw"; // YouTube ID z podanego linku

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div
        className="video-container"
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Featured YouTube Video"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default FeaturedVideoPage;