import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "@tanstack/react-query";

import Button from "../../UI/Button/Button";

import { LoggedInUserContext } from "../../../context/LoggedInUserContext";
import { VideoInterface } from "../../../interfaces/VideoInterface";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  tellToSignUp: boolean;
  setTellToSignUp: (tellToSignUp: boolean) => void;
  todaysVideoQuery: UseQueryResult<VideoInterface, Error>;
}

const CollectButton = (props: CollectButtonProps) => {
  const { user: loggedInUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const collectVideo = () => {
    console.log("collected");
  };

  const handleClick = () => {
    if (props.tellToSignUp) return navigate("/register");
    else if (loggedInUser) collectVideo();
    else props.setTellToSignUp(true);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        disabled={!props.todaysVideoQuery.isSuccess || loggedInUser != null}
        waitingForResponse={false}
        className={[styles.collectBtn, props.className].join(" ")}
      >
        {props.tellToSignUp
          ? "Sign up"
          : loggedInUser === null
          ? "Collect"
          : "Soon"}
      </Button>
    </>
  );
};

export default CollectButton;
