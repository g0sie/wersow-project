import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../../App";

import Logo from "./Logo";
import Button from "../Button/Button";

import styles from "./Header.module.css";

const Header = (props: { updateUser: () => void }) => {
  const loggedInUser = useContext(LoggedInUserContext);

  const [isNavActive, setIsNavActive] = useState(false);

  const logOut = async () => {
    await fetch("https://wersow-api.herokuapp.com/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.updateUser();

    turnOffNav();
  };

  const toggleNav = () => setIsNavActive(!isNavActive);
  const turnOffNav = () => {
    if (isNavActive) toggleNav();
  };

  return (
    <header className={styles.header}>
      <Logo turnOffNav={turnOffNav} />

      {/* NAVIGATION */}
      <nav
        className={
          isNavActive ? `${styles.nav} ${styles.navActive}` : styles.nav
        }
      >
        {/* nav links */}
        <ul
          className={
            isNavActive
              ? `${styles.navLinks} ${styles.navLinksActive}`
              : styles.navLinks
          }
        >
          <Link className={styles.navLink} to="/" onClick={turnOffNav}>
            <li>Home</li>
          </Link>
          <Link className={styles.navLink} to="/register" onClick={turnOffNav}>
            <li>Register</li>
          </Link>
          <Link className={styles.navLink} to="/" onClick={turnOffNav}>
            <li>Home</li>
          </Link>
        </ul>
        {/* ( LOG IN, SIGN UP ) / ( LOG OUT ) */}
        <div
          className={
            isNavActive
              ? `${styles.authButtons} ${styles.authButtonsActive}`
              : styles.authButtons
          }
        >
          {loggedInUser === null ? (
            <>
              <Link to="login" onClick={turnOffNav}>
                <Button
                  className={[styles.resetBtn, styles.navLink]}
                  size="small"
                >
                  Log in
                </Button>
              </Link>

              <Link to="register" onClick={turnOffNav}>
                <Button
                  className={[styles.resetBtn, styles.navLink]}
                  size="small"
                >
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <div>
              <Button
                className={[styles.resetBtn, styles.navLink]}
                size="small"
                onClick={logOut}
              >
                Log out
              </Button>
            </div>
          )}
        </div>

        {/* dimming */}
        <div
          className={
            isNavActive
              ? `${styles.dimming} ${styles.dimmingActive}`
              : styles.dimming
          }
          onClick={turnOffNav}
        ></div>
      </nav>

      <button className={styles.hamburger} onClick={toggleNav}>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
        <div className={styles.hamburgerLine}></div>
      </button>
    </header>
  );
};

export default Header;
