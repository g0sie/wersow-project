import { Link } from "react-router-dom";

import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";

const Logo = (props: { turnOffNav: () => void }) => {
  return (
    <Link to="/" className={styles.logo} onClick={props.turnOffNav}>
      <img className={styles.logoImg} src={logoImg} alt="" />
      <h1 className={styles.logoText}>wersow-project</h1>
    </Link>
  );
};

export default Logo;
