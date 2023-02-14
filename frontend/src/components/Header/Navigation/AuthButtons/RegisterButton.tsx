import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../../context/NavContext";

import styles from "../../Header.module.css";

interface RegisterButtonProps {
  btnClassName: string;
}

const RegisterButton = (props: RegisterButtonProps) => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);

  return (
    <Link
      to="register"
      onClick={() => setIsNavOpened(false)}
      className={styles.navLink}
    >
      <button className={props.btnClassName}>Sign up</button>
    </Link>
  );
};

export default RegisterButton;
