import { ReactNode } from "react";

import styles from "./Video.module.css";

interface VideoPlaceholderProps {
  children?: ReactNode;
}

const VideoPlaceholder = (props: VideoPlaceholderProps) => {
  return (
    <div className={`${styles.videoPlayerPlaceholder} ${styles.placeholder}`}>
      {props.children}
    </div>
  );
};

export default VideoPlaceholder;
