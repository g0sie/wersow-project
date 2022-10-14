interface VideoProps {
  url: string;
}

const Video = (props: VideoProps) => {
  return (
    <div>
      <iframe
        width="200"
        height="200"
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
