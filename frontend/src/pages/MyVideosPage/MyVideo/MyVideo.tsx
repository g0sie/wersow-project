import { CollectedVideoInterface } from "../../../interfaces/CollectedVideoInterface";

import PublishedIcon from "./icons/PublishedIcon";
import CollectedIcon from "./icons/CollectedIcon";

import styles from "./MyVideo.module.css";

interface MyVideoProps {
  video: CollectedVideoInterface;
}

const timeFrom = (from: Date) => {
  const today = new Date();
  const MILISECONDS_IN_DAY = 86400000;
  return Math.floor((today.getTime() - from.getTime()) / MILISECONDS_IN_DAY);
};

const timeFromStr = (days: number) => {
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 365) return `${days} days ago`;

  const years = Math.floor(days / 365);
  if (years === 1) return "1 year ago";
  return `${years} years ago`;
};

const MyVideo = (props: MyVideoProps) => {
  const timeFromPublishing = (video: CollectedVideoInterface) => {
    const published = new Date(video.publish_date);
    const days = timeFrom(published);
    return timeFromStr(days);
  };

  const timeFromCollecting = (video: CollectedVideoInterface) => {
    const collected = new Date(video.collected);
    const days = timeFrom(collected);
    return timeFromStr(days);
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
        <div className={styles.day}>
          <PublishedIcon />
          <p>{timeFromPublishing(props.video)}</p>
        </div>
        <div className={styles.dot}></div>
        <div className={styles.day}>
          <CollectedIcon />
          <p>{timeFromCollecting(props.video)}</p>
        </div>
      </div>
    </div>
  );
};

export default MyVideo;
