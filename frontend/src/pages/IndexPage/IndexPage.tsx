import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import TodaysVideo from "../../components/Video/TodaysVideo";
import VideoTitle from "../../components/Video/VideoTitle/VideoTitle";
import CollectButton from "../../components/Video/CollectButton/CollectButton";
import ErrorMessage from "../../components/forms/ErrorMessage";

import { VideoInterface } from "../../interfaces/VideoInterface";

import axios from "../../api";

import pageStyles from "../Page.module.css";
import styles from "./IndexPage.module.css";

export const IndexPage = () => {
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Join #teamsówki to collect videos");

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
        />

        <CollectButton
          className={styles.collectButton}
          todaysVideoQuery={todaysVideoQuery}
          setShowError={setShowError}
          setErrorMsg={setErrorMsg}
        />

        <ErrorMessage
          className={styles.errorMsg}
          visible={showError}
          message={errorMsg}
        />
      </div>
    </div>
  );
};

export default IndexPage;
