import { useEffect, useState } from "react";
import axios from "../api";
import TodaysVideo from "../components/Video/TodaysVideo";
import pageStyles from "./Page.module.css";

export interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

export const IndexPage = () => {
  const [todaysVideo, setTodaysVideo] = useState<VideoInterface | null>(null);
  const [loadingFailed, setLoadingFailed] = useState(false);

  const fetchTodaysVideo = () => {
    axios
      .get("/videos/todays")
      .then((res) => setTodaysVideo(res.data))
      .catch((error) => {
        setLoadingFailed(true);
        console.error(error.toJSON().message);
      });
  };

  useEffect(() => {
    fetchTodaysVideo();
  }, []);

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <TodaysVideo video={todaysVideo} loadingFailed={loadingFailed} />
    </div>
  );
};

export default IndexPage;
