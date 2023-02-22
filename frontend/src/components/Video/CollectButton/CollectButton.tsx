import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import useLoggedInUser from "../../../hooks/queries/useLoggedInUser";
import useTodaysVideo from "../../../hooks/queries/useTodaysVideo";

import Button from "../../UI/Button/Button";

import axios from "../../../api";
import { AxiosError } from "axios";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  setShowError: (show: boolean) => void;
  setErrorMsg: (message: string) => void;
}

const CollectButton = (props: CollectButtonProps) => {
  const { data: video, isSuccess: isVideoThere } = useTodaysVideo();
  const { data: user } = useLoggedInUser();

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
    onError: (e) => {
      props.setErrorMsg("Sorry, something went wrong :(");
      props.setShowError(true);
    },
  });

  const collectedQuery = useQuery({
    queryKey: ["user", "video"],
    queryFn: () => {
      return axios.get(`/users/${user?.id}/videos/${video?.id}`);
    },
    enabled: !!user && isVideoThere,
    retry: false,
  });

  const handleClick = () => {
    if (!user && toldToSignUp.current === false) {
      props.setErrorMsg("Join #teamsówki to collect videos");
      props.setShowError(true);
      toldToSignUp.current = true;
    } else if (toldToSignUp.current === true) {
      return navigate("/register");
    } else if (!!user && isVideoThere) {
      collectMutation.mutate({
        user_id: user.id,
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
      success={
        !!user && (collectMutation.isSuccess || collectedQuery.isSuccess)
      }
    >
      {toldToSignUp.current ? "Sign up" : "Collect"}
    </Button>
  );
};

export default CollectButton;
