import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../../../hooks/mutations/useLogout";

import { NavContext } from "../../../../context/NavContext";

import styles from "../NavLinks/NavLinks.module.css";

interface LogoutButtonProps {
  btnClassName: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const logOut = async () => {
    logoutMutation.mutate();
    setIsNavOpened(false);
    navigate("/");
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.btnClassName}>Log out</button>
    </div>
  );
};

export default LogoutButton;
