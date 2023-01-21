import { useContext } from "react";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../../App";

import Button from "../Button/Button";

import styles from "./Header.module.css";
import logoImg from "../../assets/logo.png";

const Header = (props: { updateUser: () => void }) => {
  const loggedInUser = useContext(LoggedInUserContext);

  const logOut = async () => {
    await fetch("https://wersow-api.herokuapp.com/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.updateUser();
  };

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <Link to="/" className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <h1 className={styles.logoText}>wersow-project</h1>
      </Link>

      {/* NAVIGATION */}
      <nav></nav>

      {/* ( LOG IN, SIGN UP ) / ( LOG OUT ) */}
      <nav className={styles.authButtons}>
        {loggedInUser === null ? (
          <>
            <Link to="login">
              <Button size="small">Log in</Button>
            </Link>

            <Link to="register">
              <Button size="small">Sign up</Button>
            </Link>
          </>
        ) : (
          <Button size="small" onClick={logOut}>
            Log out
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Header;
