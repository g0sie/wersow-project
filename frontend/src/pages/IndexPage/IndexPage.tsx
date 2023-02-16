import { useState } from "react";

import TodaysVideo from "../../components/Video/TodaysVideo";
import VideoTitle from "../../components/Video/VideoTitle/VideoTitle";
import CollectButton from "../../components/Video/CollectButton/CollectButton";
import ErrorMessage from "../../components/forms/ErrorMessage";

import useTodaysVideo from "../../hooks/queries/useTodaysVideo";

import pageStyles from "../Page.module.css";
import styles from "./IndexPage.module.css";

export const IndexPage = () => {
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Join #teamsówki to collect videos");

  const { data: video } = useTodaysVideo();

  return (
    <div className={[pageStyles.page, pageStyles.pageCentered].join(" ")}>
      <div className={styles.indexPage}>
        <TodaysVideo className={styles.todaysVideo} />

        <VideoTitle className={styles.videoTitle} title={video?.title} />

        <CollectButton
          className={styles.collectButton}
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
