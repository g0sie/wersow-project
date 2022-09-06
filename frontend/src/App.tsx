import React, { useEffect, useState } from "react";
import "./App.css";

interface VideoProps {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

function App() {
  const [video, setVideo] = useState<VideoProps>();

  const getVideo = async () => {
    const response = await fetch(
      "https://wersow-api.herokuapp.com/api/videos/todays"
    );
    const data = await response.json();
    setVideo(await data);
    console.log(await data);
    console.log(await video?.url);
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div className="App">
      {video && (
        <div>
          <iframe
            width="200"
            height="200"
            src={video.url.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h1 className="video-title">{video.title}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
