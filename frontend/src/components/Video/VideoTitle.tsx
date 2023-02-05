import styles from "./Video.module.css";

interface VideoTitleProps {
  title?: string;
}

const VideoTitle = (props: VideoTitleProps) => {
  const className = props.title
    ? styles.videoTitle
    : `${styles.videoTitlePlaceholder}  ${styles.placeholder}`;

  return (
    <div className={styles.videoTitleWrapper}>
      <p className={className}>{props.title}</p>
    </div>
  );
};

export default VideoTitle;
