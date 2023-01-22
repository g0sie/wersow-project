import { Link } from "react-router-dom";

import styles from "../../Header.module.css";

interface RegisterButtonProps {
  turnOffNav: () => void;
  className: string;
}

const RegisterButton = (props: RegisterButtonProps) => {
  return (
    <Link to="register" onClick={props.turnOffNav} className={styles.navLink}>
      <button className={props.className}>Sign up</button>
    </Link>
  );
};

export default RegisterButton;
