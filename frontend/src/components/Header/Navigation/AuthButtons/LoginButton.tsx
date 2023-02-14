import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../../context/NavContext";

import styles from "../../Header.module.css";

interface LoginButtonProps {
  btnClassName: string;
}

const LoginButton = (props: LoginButtonProps) => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);

  return (
    <Link
      to="login"
      onClick={() => setIsNavOpened(false)}
      className={styles.navLink}
    >
      <button className={props.btnClassName}>Log in</button>
    </Link>
  );
};

export default LoginButton;
