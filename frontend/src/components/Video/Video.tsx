import { useCallback, useEffect, useState } from "react";
import styles from "./Video.module.css";
import VideoLoader from "./VideoLoader";

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

  const getVideo = useCallback(async () => {
    const response = await fetch(
      "https://wersow-api.herokuapp.com/videos/todays"
    );
    const data = await response.json();
    setVideo(await data);
  }, []);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  return (
    <div className={styles.video}>
      <div className={styles.videoWrapper}>
        <div className={styles.videoBackground}>
          {video ? (
            <iframe
              className={styles.videoPlayer}
              width="560"
              height="315"
              src={video.url.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <VideoLoader message="kupowanie licencji..." />
          )}
        </div>
      </div>
      <div className={styles.videoTitleWrapper}>
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
