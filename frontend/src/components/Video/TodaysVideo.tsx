import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoPlaceholder from "./VideoPlayer/VideoPlaceholder";
import VideoLoader from "./VideoPlayer/VideoLoader";
import VideoTitle from "./VideoTitle";

import { VideoInterface } from "../../pages/IndexPage";

import styles from "./Video.module.css";

interface TodaysVideoProps {
  video: VideoInterface | null;
  loadingFailed: boolean;
}

const TodaysVideo = (props: TodaysVideoProps) => {
  return (
    <div className={styles.video}>
      <div className={styles.videoPlayerWrapper}>
        {props.video ? (
          <VideoPlayer url={props.video.url.replace("watch?v=", "embed/")} />
        ) : (
          <VideoPlaceholder>
            <VideoLoader loadingFailed={props.loadingFailed} />
          </VideoPlaceholder>
        )}
      </div>
      <VideoTitle title={props.video?.title} />
    </div>
  );
};

export default TodaysVideo;
