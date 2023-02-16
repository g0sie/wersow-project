import { useContext } from "react";
import { NavContext } from "../../../../context/NavContext";

import useLoggedInUser from "../../../../hooks/queries/useLoggedInUser";

import axios from "../../../../api";
import styles from "../NavLinks/NavLinks.module.css";

interface LogoutButtonProps {
  btnClassName: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);
  const { refetch: refetchUser } = useLoggedInUser();

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
        refetchUser();
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
