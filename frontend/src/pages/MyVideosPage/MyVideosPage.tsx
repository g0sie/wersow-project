import { useContext, useEffect } from "react";
import { LoggedInUserContext } from "../../context/LoggedInUserContext";
import useMyVideos from "../../hooks/useMyVideos";
import pageStyles from "../Page.module.css";

const MyVideosPage = () => {
  const { data: videos, isSuccess, refetch: refetchVideos } = useMyVideos();
  const { user } = useContext(LoggedInUserContext);

  useEffect(() => {
    refetchVideos();
    console.log(videos);
    videos && videos.length > 0 && console.log(videos[0].thumbnail_url);
  }, [user, refetchVideos, videos]);

  return (
    <div
      className={[pageStyles.page, pageStyles.pageCentered].join(" ")}
      style={{ color: "white", fontSize: "3rem" }}
      data-testid="videos-page"
    >
      {isSuccess && Array.isArray(videos)
        ? videos.map((video) => (
            <img
              src={video.thumbnail_url}
              alt={`thumbnail of ${video.title}`}
            />
          ))
        : "Loading..."}
    </div>
  );
};

export default MyVideosPage;
