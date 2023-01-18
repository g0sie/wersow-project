import { useContext } from "react";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../../App";

import Button from "../Button/Button";

import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";

const Header = () => {
  const loggedInUser = useContext(LoggedInUserContext);

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/">
        <img className={styles.logoImg} src={logoImg} alt="" />
      </Link>

      {/* NAVBAR */}
      <nav className="navbar"></nav>

      {/* ( LOG IN, SIGN UP ) / ( LOG OUT ) */}
      <div className={styles.authButtons}>
        {loggedInUser === null ? (
          <>
            <Link to={"login"}>
              <Button size="small">Log in</Button>
            </Link>

            <Link to={"register"}>
              <Button size="small">Sign up</Button>
            </Link>
          </>
        ) : (
          <Button size="small">Log out</Button>
        )}
      </div>
    </header>
  );
};

export default Header;
