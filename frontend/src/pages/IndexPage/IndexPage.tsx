import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import axios from "../../api";
import { LoggedInUserContext } from "../../App";

import TodaysVideo from "../../components/Video/TodaysVideo";
import VideoTitle from "../../components/Video/VideoTitle/VideoTitle";
import Button from "../../components/UI/Button/Button";

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
  const loggedInUser = useContext(LoggedInUserContext);

  const todaysVideoQuery = useQuery<VideoInterface, Error>({
    queryKey: ["todaysVideo"],
    queryFn: () => axios.get("/videos/todays").then((res) => res.data),
  });

  return (
    <div className={[styles.indexPage, pageStyles.page].join(" ")}>
      <TodaysVideo todaysVideoQuery={todaysVideoQuery} />

      <VideoTitle title={todaysVideoQuery.data?.title} />

      <Button
        type="button"
        waitingForResponse={todaysVideoQuery.isLoading}
        className={styles.collectButton}
      >
        {loggedInUser ? "Collect" : "Sign to #teamsówki to collect videos"}
      </Button>
    </div>
  );
};

export default IndexPage;
