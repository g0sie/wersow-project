import { useContext } from "react";

import { LoggedInUserContext } from "../../../../App";

import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";

import styles from "../../Header.module.css";

interface AuthButtonsProps {
  isNavActive: boolean;
  updateUser: () => void;
  turnOffNav: () => void;
}

const authButtonsActiveClassName = `${styles.authButtons} ${styles.authButtonsActive}`;

const AuthButtons = (props: AuthButtonsProps) => {
  const loggedInUser = useContext(LoggedInUserContext);

  let buttons;
  if (loggedInUser) {
    buttons = (
      <LogoutButton
        updateUser={props.updateUser}
        turnOffNav={props.turnOffNav}
      />
    );
  } else {
    buttons = (
      <>
        <LoginButton turnOffNav={props.turnOffNav} />
        <RegisterButton turnOffNav={props.turnOffNav} />
      </>
    );
  }

  return (
    <div
      className={
        props.isNavActive ? authButtonsActiveClassName : styles.authButtons
      }
    >
      {buttons}
    </div>
  );
};

export default AuthButtons;
