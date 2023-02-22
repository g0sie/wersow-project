import useMyVideos from "../../hooks/queries/useMyVideos";
import MyVideo from "./MyVideo/MyVideo";

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
          <MyVideo video={video} key={video.id} />
        ))}
      </div>
    );
  }

  return message("Failed to load videos :(");
};

export default MyVideosPage;
