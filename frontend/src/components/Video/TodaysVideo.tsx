import { UseQueryResult } from "@tanstack/react-query";

import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoPlaceholder from "./VideoPlayer/VideoPlaceholder";
import LoadingMessage from "./VideoPlayer/LoadingMessage/LoadingMessage";
import VideoTitle from "./VideoTitle";

import { VideoInterface } from "../../pages/IndexPage/IndexPage";

import styles from "./Video.module.css";

interface TodaysVideoProps {
  todaysVideoQuery: UseQueryResult<VideoInterface, Error>;
}

const TodaysVideo = (props: TodaysVideoProps) => {
  return (
    <div className={styles.video}>
      <div className={styles.videoPlayerWrapper}>
        {props.todaysVideoQuery.isSuccess ? (
          <VideoPlayer
            url={props.todaysVideoQuery.data.url.replace("watch?v=", "embed/")}
          />
        ) : (
          <VideoPlaceholder>
            <LoadingMessage loadingFailed={props.todaysVideoQuery.isError} />
          </VideoPlaceholder>
        )}
      </div>
      <VideoTitle title={props.todaysVideoQuery.data?.title} />
    </div>
  );
};

export default TodaysVideo;
