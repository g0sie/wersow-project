import { useContext } from "react";

import { Link } from "react-router-dom";

import { LoggedInUserContext } from "../../../App";

import Button from "../../Button/Button";

import styles from "../Header.module.css";

interface NavigationProps {
  isNavActive: boolean;
  turnOffNav: () => void;
  updateUser: () => void;
}

const Navigation = (props: NavigationProps) => {
  const loggedInUser = useContext(LoggedInUserContext);

  const logOut = async () => {
    await fetch("https://wersow-api.herokuapp.com/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.updateUser();

    props.turnOffNav();
  };

  return (
    <nav
      className={
        props.isNavActive ? `${styles.nav} ${styles.navActive}` : styles.nav
      }
    >
      {/* nav links */}
      <ul
        className={
          props.isNavActive
            ? `${styles.navLinks} ${styles.navLinksActive}`
            : styles.navLinks
        }
      >
        <Link className={styles.navLink} to="/" onClick={props.turnOffNav}>
          <li>Home</li>
        </Link>
        <Link
          className={styles.navLink}
          to="/register"
          onClick={props.turnOffNav}
        >
          <li>Register</li>
        </Link>
        <Link className={styles.navLink} to="/" onClick={props.turnOffNav}>
          <li>Home</li>
        </Link>
      </ul>

      {/* ( LOG IN, SIGN UP ) / ( LOG OUT ) */}
      <div
        className={
          props.isNavActive
            ? `${styles.authButtons} ${styles.authButtonsActive}`
            : styles.authButtons
        }
      >
        {loggedInUser === null ? (
          <>
            <Link to="login" onClick={props.turnOffNav}>
              <Button
                className={[styles.resetBtn, styles.navLink]}
                size="small"
              >
                Log in
              </Button>
            </Link>

            <Link to="register" onClick={props.turnOffNav}>
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
          props.isNavActive
            ? `${styles.dimming} ${styles.dimmingActive}`
            : styles.dimming
        }
        onClick={props.turnOffNav}
      ></div>
    </nav>
  );
};

export default Navigation;
