import styles from "./LoadingMessage.module.css";

const loadingMessages = [
  "Negotiating with a French artist",
  "Looking for inspiration on pinterest",
  "Buying a license",
  "Walking the Chmurka",
  "Wait, I'm in the middle of hating buses",
  "recording IS IT TRUE THAT",
];

const randomMessage = () =>
  loadingMessages[Math.floor(Math.random() * loadingMessages.length)] + "...";

interface loadingMessageProps {
  loadingFailed: boolean;
}

const LoadingMessage = (props: loadingMessageProps) => {
  const message = props.loadingFailed
    ? "Failed to load today's video :("
    : randomMessage();

  if (props.loadingFailed) {
    return <p className={styles.loadingMessage}>{message}</p>;
  }

  const DURATION = 1.5; // in seconds
  const CHARS_PER_WAVE = 3;

  const delay = (index: number) => {
    return ((index % CHARS_PER_WAVE) * DURATION) / CHARS_PER_WAVE;
  };

  return (
    <div className={styles.loadingMessage}>
      {message.split("").map((char: string, index: number) => {
        return (
          <pre
            key={index}
            className={[styles.character, styles.loadingMessage].join(" ")}
            style={{
              animationDuration: `${DURATION}s`,
              animationDelay: `${delay(index)}s`,
            }}
          >
            {char}
          </pre>
        );
      })}
    </div>
  );
};

export default LoadingMessage;
