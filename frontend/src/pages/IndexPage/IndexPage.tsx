import { useQuery } from "@tanstack/react-query";

import axios from "../../api";

import TodaysVideo from "../../components/Video/TodaysVideo";
import VideoTitle from "../../components/Video/VideoTitle/VideoTitle";
import CollectButton from "../../components/Video/CollectButton/CollectButton";

import pageStyles from "../Page.module.css";
import styles from "./IndexPage.module.css";

export interface VideoInterface {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  publish_date: string;
  todays: boolean;
}

export const IndexPage = () => {
  const todaysVideoQuery = useQuery<VideoInterface, Error>({
    queryKey: ["todaysVideo"],
    queryFn: () => axios.get("/videos/todays").then((res) => res.data),
  });

  return (
    <div className={[pageStyles.page, pageStyles.pageCentered].join(" ")}>
      <div className={styles.indexPage}>
        <TodaysVideo
          className={styles.todaysVideo}
          todaysVideoQuery={todaysVideoQuery}
        />

        <VideoTitle
          className={styles.videoTitle}
          title={todaysVideoQuery.data?.title}
          // title={undefined}
        />

        <CollectButton className={styles.collectButton} />
      </div>
    </div>
  );
};

export default IndexPage;