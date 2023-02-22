import videoStyles from "../Video.module.css";
import titleStyles from "./VideoTitle.module.css";

interface VideoTitleProps {
  title?: string;
  className?: string;
}

const VideoTitle = (props: VideoTitleProps) => {
  const titleClassName = props.title
    ? titleStyles.videoTitle
    : [titleStyles.videoTitlePlaceholder, videoStyles.placeholder].join(" ");

  return (
    <div
      className={[titleStyles.videoTitleWrapper, props?.className].join(" ")}
    >
      <h2 className={titleClassName}>{props.title}</h2>
    </div>
  );
};

export default VideoTitle;
