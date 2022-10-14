import { useCallback, useEffect, useState } from "react";
import VideoComponent from "../components/Video";
interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

export const IndexPage = () => {
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
    <>
      {video && (
        <>
          <VideoComponent url={video.url} />
          <p className="video-title">{video.title}</p>
        </>
      )}
    </>
  );
};

export default IndexPage;
