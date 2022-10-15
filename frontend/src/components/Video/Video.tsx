import styles from "./Video.module.css";

interface VideoProps {
  url: string;
}

const Video = (props: VideoProps) => {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        className={styles.video}
        width="560"
        height="315"
        src={props.url.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Video;
