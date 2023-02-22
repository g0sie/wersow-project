import { Link } from "react-router-dom";
import useMyVideos from "../../hooks/queries/useMyVideos";

import pageStyles from "../Page.module.css";
import styles from "./MyVideosPage.module.css";

const MyVideosPage = () => {
  const { data: videos, isLoading, isSuccess } = useMyVideos();

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
          <a
            className={styles.video}
            href={video.url}
            target="_blank"
            rel="noopner"
            key={video.id}
          >
            <img
              src={video.thumbnail_url}
              alt={`thumbnail of ${video.title}`}
              className={styles.thumbnail}
            />
            <p className={styles.title}>{video.title}</p>
          </a>
        ))}
      </div>
    );
  }

  return message("Failed to load videos :(");
};

export default MyVideosPage;
