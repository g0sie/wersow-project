import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, UseQueryResult } from "@tanstack/react-query";

import Button from "../../UI/Button/Button";

import { LoggedInUserContext } from "../../../context/LoggedInUserContext";
import { VideoInterface } from "../../../interfaces/VideoInterface";

import axios from "../../../api";
import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  tellToSignUp: boolean;
  setTellToSignUp: (tellToSignUp: boolean) => void;
  todaysVideoQuery: UseQueryResult<VideoInterface, Error>;
}

const CollectButton = (props: CollectButtonProps) => {
  const { isSuccess: isVideoThere, data: video } = props.todaysVideoQuery;
  const { user: loggedInUser } = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (obj: { user_id: number; video_id: number }) => {
      return axios.post(`/users/${obj.user_id}/videos`, {
        video_id: obj.video_id,
      });
    },
  });

  const handleClick = () => {
    if (props.tellToSignUp) return navigate("/register");
    else if (!loggedInUser) props.setTellToSignUp(true);
    else if (loggedInUser && isVideoThere) {
      mutation.mutate({
        user_id: loggedInUser.id,
        video_id: video.id,
      });
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        disabled={!isVideoThere}
        waitingForResponse={mutation.isLoading}
        className={[styles.collectBtn, props.className].join(" ")}
      >
        {props.tellToSignUp ? "Sign up" : "Collect"}
      </Button>
    </>
  );
};

export default CollectButton;
