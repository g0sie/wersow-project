import styles from "../Video.module.css";

interface videoLoaderProps {
  loadingFailed: boolean;
}

const VideoLoader = (props: videoLoaderProps) => {
  const message = props.loadingFailed
    ? "Failed to load today's video :("
    : "Looking for inspiration on pinterest";

  if (props.loadingFailed) {
    return <p>{message}</p>;
  }

  const DURATION = 1.5; // in seconds
  const CHARS_PER_WAVE = 3;

  const delay = (index: number) => {
    return ((index % CHARS_PER_WAVE) * DURATION) / CHARS_PER_WAVE;
  };

  return (
    <>
      {message.split("").map((char: string, index: number) => {
        return (
          <pre
            key={index}
            className={styles.character}
            style={{
              animationDuration: `${DURATION}s`,
              animationDelay: `${delay(index)}s`,
            }}
          >
            {char}
          </pre>
        );
      })}
    </>
  );
};

export default VideoLoader;
