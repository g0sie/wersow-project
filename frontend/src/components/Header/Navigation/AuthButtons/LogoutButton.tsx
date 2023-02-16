import { useContext } from "react";
import { NavContext } from "../../../../context/NavContext";

import useLogout from "../../../../hooks/mutations/useLogout";

import styles from "../NavLinks/NavLinks.module.css";

interface LogoutButtonProps {
  btnClassName: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);
  const logoutMutation = useLogout();

  const logOut = async () => {
    logoutMutation.mutate();
    setIsNavOpened(false);
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.btnClassName}>Log out</button>
    </div>
  );
};

export default LogoutButton;
