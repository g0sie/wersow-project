import { UseQueryResult } from "@tanstack/react-query";

import VideoPlayer from "./VideoPlayer/VideoPlayer";
import VideoPlaceholder from "./VideoPlayer/VideoPlaceholder";
import LoadingMessage from "./VideoPlayer/LoadingMessage/LoadingMessage";

import { VideoInterface } from "../../pages/IndexPage/IndexPage";

import styles from "./Video.module.css";

interface TodaysVideoProps {
  todaysVideoQuery: UseQueryResult<VideoInterface, Error>;
}

const TodaysVideo = (props: TodaysVideoProps) => {
  return (
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
  );
};

export default TodaysVideo;
