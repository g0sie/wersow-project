import { useCallback, useEffect, useState } from "react";
import { VideoInterface } from "./components/Video/VideoInterface";
import VideoComponent from "./components/Video/VideoComponent";
import "./App.css";

function App() {
  const [video, setVideo] = useState<VideoInterface>();

  const getVideo = useCallback(async () => {
    const response = await fetch(
      "https://wersow-api.herokuapp.com/api/videos/todays"
    );
    const data = await response.json();
    setVideo(await data);
  }, []);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  return (
    <div className="App">{video && <VideoComponent url={video.url} />}</div>
  );
}

export default App;
