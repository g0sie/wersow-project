import useMyVideos from "../../hooks/queries/useMyVideos";
import { CollectedVideoInterface } from "../../interfaces/CollectedVideoInterface";

import pageStyles from "../Page.module.css";
import styles from "./MyVideosPage.module.css";

const daysFrom = (from: Date) => {
  const today = new Date();
  const MILISECONDS_IN_DAY = 86400000;
  return Math.floor((today.getTime() - from.getTime()) / MILISECONDS_IN_DAY);
};

const daysAgoStr = (days: number) => {
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
};

const MyVideosPage = () => {
  const { data: videos, isLoading, isSuccess } = useMyVideos();

  const daysFromPublishing = (video: CollectedVideoInterface) => {
    const published = new Date(video.publish_date);
    const days = daysFrom(published);
    return daysAgoStr(days);
  };

  const daysFromCollecting = (video: CollectedVideoInterface) => {
    const collected = new Date(video.collected);
    const days = daysFrom(collected);
    return daysAgoStr(days);
  };

  const message = (text: string) => {
    return (
      <p
        className={[
          styles.message,
          pageStyles.page,
          pageStyles.pageCentered,
        ].join(" ")}
      >
        {text}
      </p>
    );
  };

  if (isLoading) {
    return message("Loading...");
  }

  if (isSuccess) {
    return (
      <div
        className={[styles.videos, pageStyles.page].join(" ")}
        data-testid="videos-page"
      >
        {videos.map((video) => (
          <div className={styles.video}>
            <a href={video.url} target="_blank" rel="noreferrer" key={video.id}>
              <img
                className={styles.thumbnail}
                src={video.thumbnail_url}
                alt={`thumbnail of ${video.title}`}
              />
              <p className={styles.title}>{video.title}</p>
            </a>
            <div className={styles.days}>
              <p>{daysFromPublishing(video)}</p>
              <div className={styles.dot}></div>
              <p>{daysFromCollecting(video)}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return message("Failed to load videos :(");
};

export default MyVideosPage;
