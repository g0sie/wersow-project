import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <img className={styles.logoImg} src={logoImg} alt="" />
      </Link>

      <nav className="nav"></nav>

      <div className={styles.authButtons}>
        <Link to={"login"}>
          <Button size="small">Log in</Button>
        </Link>

        <Link to={"register"}>
          <Button size="small">Sign up</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
