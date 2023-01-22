import { useRef } from "react";
import { Link } from "react-router-dom";

import buttonStyles from "../../../../assets/css/button.module.css";
import styles from "../../Header.module.css";

const LoginButton = (props: { turnOffNav: () => void }) => {
  return (
    <Link to="login" onClick={props.turnOffNav}>
      <button className={buttonStyles.btn}>Log in</button>
    </Link>
  );
};

export default LoginButton;
