import { useContext } from "react";

import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

import useWindowSize from "../../../../hooks/useWindowSize";

import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";

import buttonStyles from "../../../UI/Button/Button.module.css";
import styles from "../../Header.module.css";

interface AuthButtonsProps {
  isNavActive: boolean;
  turnOffNav: () => void;
}

const authButtonsActiveClassName = `${styles.authButtons} ${styles.authButtonsActive}`;

const AuthButtons = (props: AuthButtonsProps) => {
  const { user: loggedInUser } = useContext(LoggedInUserContext);

  const windowWidth = useWindowSize()[0];

  let buttonClassName;
  if (windowWidth <= 630) {
    buttonClassName = styles.authButtonOnSmallScreen;
  } else {
    buttonClassName = buttonStyles.btn;
  }

  let buttons;
  if (loggedInUser) {
    buttons = (
      <LogoutButton className={buttonClassName} turnOffNav={props.turnOffNav} />
    );
  } else {
    buttons = (
      <>
        <LoginButton
          className={buttonClassName}
          turnOffNav={props.turnOffNav}
        />
        <RegisterButton
          className={buttonClassName}
          turnOffNav={props.turnOffNav}
        />
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
