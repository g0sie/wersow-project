import styles from "../Video.module.css";

interface loaderProps {
  message: string;
}

const Loader = (props: loaderProps) => {
  const DURATION = 1.5; // in seconds
  const CHARS_PER_WAVE = 3;

  const delay = (index: number) => {
    return ((index % CHARS_PER_WAVE) * DURATION) / CHARS_PER_WAVE;
  };

  return (
    <>
      {props.message.split("").map((char: string, index: number) => {
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

export default Loader;
