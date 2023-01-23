import { Link } from "react-router-dom";

import styles from "../../Header.module.css";

interface LoginButtonProps {
  turnOffNav: () => void;
  className: string;
}

const LoginButton = (props: LoginButtonProps) => {
  return (
    <Link to="login" onClick={props.turnOffNav} className={styles.navLink}>
      <button className={props.className}>Log in</button>
    </Link>
  );
};

export default LoginButton;
