import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../context/NavContext";

import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";

const Logo = () => {
  const { setIsOpened: setIsNavOpened } = useContext(NavContext);

  return (
    <Link to="/" className={styles.logo} onClick={() => setIsNavOpened(false)}>
      <img className={styles.logoImg} src={logoImg} alt="" />
      <h1 className={styles.logoText}>wersow-project</h1>
    </Link>
  );
};

export default Logo;
