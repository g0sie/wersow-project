import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

import Button from "../../UI/Button/Button";

import { LoggedInUserContext } from "../../../context/LoggedInUserContext";
import { VideoInterface } from "../../../interfaces/VideoInterface";

import axios from "../../../api";
import { AxiosError } from "axios";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  todaysVideoQuery: UseQueryResult<VideoInterface, Error>;
  setShowError: (show: boolean) => void;
  setErrorMsg: (message: string) => void;
}

const CollectButton = (props: CollectButtonProps) => {
  const { isSuccess: isVideoThere, data: video } = props.todaysVideoQuery;
  const { user: loggedInUser } = useContext(LoggedInUserContext);

  const [isCollected, setIsCollected] = useState(false);
  const toldToSignUp = useRef(false);

  const navigate = useNavigate();

  const collectMutation = useMutation({
    mutationFn: (obj: { user_id: number; video_id: number }) => {
      return axios
        .post(`/users/${obj.user_id}/videos`, {
          video_id: obj.video_id,
        })
        .catch((e: AxiosError) => {
          if (e.response && e.response.data !== "Video already collected")
            throw e;
        });
    },
    onSuccess: () => {
      setIsCollected(true);
    },
    onError: (e) => {
      props.setErrorMsg("Sorry, something went wrong :(");
      props.setShowError(true);
    },
  });

  const collectedQuery = useQuery({
    queryKey: ["collectedVideo"],
    queryFn: () => {
      return axios.get(`/users/${loggedInUser?.id}/videos/${video?.id}`);
    },
    enabled: !!loggedInUser && isVideoThere,
  });

  useEffect(() => {
    setIsCollected(!!loggedInUser && isVideoThere && collectedQuery.isSuccess);
  }, [loggedInUser, isVideoThere, collectedQuery.isSuccess]);

  const handleClick = () => {
    if (!loggedInUser && toldToSignUp.current === false) {
      props.setErrorMsg("Join #teamsówki to collect videos");
      props.setShowError(true);
      toldToSignUp.current = true;
    } else if (toldToSignUp.current === true) {
      return navigate("/register");
    } else if (loggedInUser && isVideoThere) {
      collectMutation.mutate({
        user_id: loggedInUser.id,
        video_id: video.id,
      });
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      disabled={!isVideoThere}
      loading={collectMutation.isLoading}
      className={[styles.collectBtn, props.className].join(" ")}
      success={isCollected}
    >
      {toldToSignUp.current ? "Sign up" : "Collect"}
    </Button>
  );
};

export default CollectButton;
