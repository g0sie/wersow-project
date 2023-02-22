import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoPlaceholder from "./VideoPlayer/VideoPlaceholder";
import LoadingMessage from "./VideoPlayer/LoadingMessage/LoadingMessage";

import styles from "./Video.module.css";
import useTodaysVideo from "../../hooks/queries/useTodaysVideo";

interface TodaysVideoProps {
  className?: string;
}

const TodaysVideo = (props: TodaysVideoProps) => {
  const { data: video, isSuccess, isError } = useTodaysVideo();

  return (
    <div className={[styles.videoPlayerWrapper, props?.className].join(" ")}>
      {isSuccess ? (
        <VideoPlayer url={video.url.replace("watch?v=", "embed/")} />
      ) : (
        <VideoPlaceholder>
          <LoadingMessage loadingFailed={isError} />
        </VideoPlaceholder>
      )}
    </div>
  );
};

export default TodaysVideo;
