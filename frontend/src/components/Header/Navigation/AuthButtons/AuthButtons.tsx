import { useContext } from "react";
import { NavContext } from "../../../../context/NavContext";

import useLoggedInUser from "../../../../hooks/queries/useLoggedInUser";
import useWindowSize from "../../../../hooks/useWindowSize";

import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import LogoutButton from "./LogoutButton";

import buttonStyles from "../../../UI/Button/Button.module.css";
import styles from "../../Header.module.css";

const authButtonsActiveClassName = `${styles.authButtons} ${styles.authButtonsActive}`;

const AuthButtons = () => {
  const { isOpened: isNavOpened } = useContext(NavContext);
  const { data: user } = useLoggedInUser();

  const windowWidth = useWindowSize()[0];

  let buttonClassName;
  if (windowWidth <= 630) {
    buttonClassName = styles.authButtonOnSmallScreen;
  } else {
    buttonClassName = buttonStyles.btn;
  }

  let buttons;
  if (!!user) {
    buttons = <LogoutButton btnClassName={buttonClassName} />;
  } else {
    buttons = (
      <>
        <LoginButton btnClassName={buttonClassName} />
        <RegisterButton btnClassName={buttonClassName} />
      </>
    );
  }

  return (
    <div
      className={isNavOpened ? authButtonsActiveClassName : styles.authButtons}
    >
      {buttons}
    </div>
  );
};

export default AuthButtons;
