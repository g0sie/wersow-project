import { Link } from "react-router-dom";

import Button from "../../../Button/Button";

import styles from "../../Header.module.css";

const LoginButton = (props: { turnOffNav: () => void }) => {
  return (
    <Link to="login" onClick={props.turnOffNav}>
      <Button
        className={[styles.btn, styles.resetBtn, styles.navLink]}
        size="small"
      >
        Log in
      </Button>
    </Link>
  );
};

export default LoginButton;
