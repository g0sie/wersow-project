import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logoImg} src={logoImg} alt="" />
      </Link>
    </header>
  );
};

export default Header;
