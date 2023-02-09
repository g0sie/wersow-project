import { useContext } from "react";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

import axios from "../../../../api";
import styles from "../../Header.module.css";

interface LogoutButtonProps {
  turnOffNav: () => void;
  className: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { update: updateUser } = useContext(LoggedInUserContext);

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

    props.turnOffNav();
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.className}>Log out</button>
    </div>
  );
};

export default LogoutButton;
