import { Link } from "react-router-dom";

import buttonStyles from "../../../../assets/css/button.module.css";
import styles from "../../Header.module.css";

const RegisterButton = (props: { turnOffNav: () => void }) => {
  return (
    <Link to="register" onClick={props.turnOffNav}>
      <button className={buttonStyles.btn}>Sign up</button>
    </Link>
  );
};

export default RegisterButton;
