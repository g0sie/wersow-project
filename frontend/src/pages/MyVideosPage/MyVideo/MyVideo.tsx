import { CollectedVideoInterface } from "../../../interfaces/CollectedVideoInterface";
import styles from "./MyVideo.module.css";

interface MyVideoProps {
  video: CollectedVideoInterface;
}

const daysFrom = (from: Date) => {
  const today = new Date();
  const MILISECONDS_IN_DAY = 86400000;
  return Math.floor((today.getTime() - from.getTime()) / MILISECONDS_IN_DAY);
};

const daysAgoStr = (days: number) => {
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
};

const MyVideo = (props: MyVideoProps) => {
  const daysFromPublishing = (video: CollectedVideoInterface) => {
    const published = new Date(video.publish_date);
    const days = daysFrom(published);
    return daysAgoStr(days);
  };

  const daysFromCollecting = (video: CollectedVideoInterface) => {
    const collected = new Date(video.collected);
    const days = daysFrom(collected);
    return daysAgoStr(days);
  };

  return (
    <div className={styles.video}>
      <a href={props.video.url} target="_blank" rel="noreferrer">
        <img
          className={styles.thumbnail}
          src={props.video.thumbnail_url}
          alt={`thumbnail of ${props.video.title}`}
        />
        <p className={styles.title}>{props.video.title}</p>
      </a>
      <div className={styles.days}>
        <p>{daysFromPublishing(props.video)}</p>
        <div className={styles.dot}></div>
        <p>{daysFromCollecting(props.video)}</p>
      </div>
    </div>
  );
};

export default MyVideo;
