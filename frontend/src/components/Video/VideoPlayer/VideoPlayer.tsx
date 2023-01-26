import styles from "../Video.module.css";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  return (
    <iframe
      className={styles.videoPlayer}
      width="560"
      height="315"
      src={props.url}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default VideoPlayer;
