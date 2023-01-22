import { useContext } from "react";

import { LoggedInUserContext } from "../../../../App";

import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import Button from "../../../Button/Button";

import styles from "../../Header.module.css";

interface AuthButtonsProps {
  isNavActive: boolean;
  updateUser: () => void;
  turnOffNav: () => void;
}

const authButtonsActiveClassName = `${styles.authButtons} ${styles.authButtonsActive}`;

const AuthButtons = (props: AuthButtonsProps) => {
  const loggedInUser = useContext(LoggedInUserContext);

  const logOut = async () => {
    await fetch("https://wersow-api.herokuapp.com/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.updateUser();

    props.turnOffNav();
  };

  return (
    <div
      className={
        props.isNavActive ? authButtonsActiveClassName : styles.authButtons
      }
    >
      {loggedInUser === null ? (
        <>
          <LoginButton turnOffNav={props.turnOffNav} />
          <RegisterButton turnOffNav={props.turnOffNav} />
        </>
      ) : (
        <div>
          <Button
            className={[styles.resetBtn, styles.navLink]}
            size="small"
            onClick={logOut}
          >
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
