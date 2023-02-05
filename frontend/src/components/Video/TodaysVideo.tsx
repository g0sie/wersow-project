import { useEffect, useState } from "react";
import axios from "../../api";

import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoPlaceholder from "./VideoPlayer/VideoPlaceholder";
import VideoLoader from "./VideoPlayer/VideoLoader";
import VideoTitle from "./VideoTitle";

import styles from "./Video.module.css";

interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

const Video = () => {
  const [video, setVideo] = useState<VideoInterface>();
  const [loadingFailed, setLoadingFailed] = useState(false);

  const fetchTodaysVideo = () => {
    axios
      .get("/videos/todays")
      .then((res) => setVideo(res.data))
      .catch((error) => {
        setLoadingFailed(true);
        console.error(error.toJSON().message);
      });
  };

  useEffect(() => {
    fetchTodaysVideo();
  }, []);

  return (
    <div className={styles.video}>
      <div className={styles.videoPlayerWrapper}>
        {video ? (
          <VideoPlayer url={video.url.replace("watch?v=", "embed/")} />
        ) : (
          <VideoPlaceholder>
            <VideoLoader loadingFailed={loadingFailed} />
          </VideoPlaceholder>
        )}
      </div>
      <VideoTitle title={video?.title} />
    </div>
  );
};

export default Video;
