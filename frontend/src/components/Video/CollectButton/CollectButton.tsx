import { useContext, useState } from "react";
import { LoggedInUserContext } from "../../../App";
import Button from "../../UI/Button/Button";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  showError: boolean;
  setShowError: (showError: boolean) => void;
}

const CollectButton = (props: CollectButtonProps) => {
  const loggedInUser = useContext(LoggedInUserContext);

  const collectVideo = () => {
    console.log("collected");
  };
  const tellToSignup = () => {
    props.setShowError(true);
    console.log("join #teamsówki to collect videos");
  };

  const handleClick = () => {
    if (loggedInUser) collectVideo();
    else tellToSignup();
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        waitingForResponse={false}
        className={[styles.collectBtn, props.className].join(" ")}
      >
        {props.showError ? "Sign up" : "Collect"}
      </Button>
    </>
  );
};

export default CollectButton;
