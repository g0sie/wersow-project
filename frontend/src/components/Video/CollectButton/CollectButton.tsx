import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../../App";
import Button from "../../UI/Button/Button";

import styles from "./CollectButton.module.css";

interface CollectButtonProps {
  className?: string;
  tellToSignUp: boolean;
  setTellToSignUp: (tellToSignUp: boolean) => void;
}

const CollectButton = (props: CollectButtonProps) => {
  const loggedInUser = useContext(LoggedInUserContext);
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
        waitingForResponse={false}
        className={[styles.collectBtn, props.className].join(" ")}
      >
        {props.tellToSignUp ? "Sign up" : "Collect"}
      </Button>
    </>
  );
};

export default CollectButton;
