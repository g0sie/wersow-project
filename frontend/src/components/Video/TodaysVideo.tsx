import { useEffect, useState } from "react";
import axios from "../../api";

import VideoPlayer from "./VideoPlayer";
import VideoPlaceholder from "./VideoPlaceholder";
import VideoLoader from "./VideoLoader";

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

  const fetchTodaysVideo = () => {
    axios
      .get("/videos/todays")
      .then((res) => setVideo(res.data))
      .catch((error) => console.error(error.toJSON()));
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
            <VideoLoader message="negotiating with a French artist..." />
          </VideoPlaceholder>
        )}
      </div>
      <div className={`${styles.videoTitleWrapper} ${styles.placeholder}`}>
        {video ? (
          <p className={styles.videoTitle}>{video.title}</p>
        ) : (
          <div className={styles.videoTitleLoader}></div>
        )}
      </div>
    </div>
  );
};

export default Video;
