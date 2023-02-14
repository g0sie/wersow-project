import { useContext } from "react";

import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";
import { NavContext } from "../../../../context/NavContext";

import axios from "../../../../api";
import styles from "../NavLinks/NavLinks.module.css";

interface LogoutButtonProps {
  btnClassName: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { update: updateUser } = useContext(LoggedInUserContext);
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);

  const logOut = async () => {
    axios
      .post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        updateUser();
      })
      .catch((error) => {
        console.error(error.toJSON());
      });

    setIsNavOpened(false);
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.btnClassName}>Log out</button>
    </div>
  );
};

export default LogoutButton;
