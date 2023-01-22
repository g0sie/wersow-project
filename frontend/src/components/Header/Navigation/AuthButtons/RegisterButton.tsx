import { Link } from "react-router-dom";

import Button from "../../../Button/Button";

import styles from "../../Header.module.css";

const RegisterButton = (props: { turnOffNav: () => void }) => {
  return (
    <Link to="register" onClick={props.turnOffNav}>
      <Button
        className={[styles.btn, styles.resetBtn, styles.navLink]}
        size="small"
      >
        Sign up
      </Button>
    </Link>
  );
};

export default RegisterButton;
