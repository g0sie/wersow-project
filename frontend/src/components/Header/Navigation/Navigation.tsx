import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../context/NavContext";

import AuthButtons from "./AuthButtons/AuthButtons";
import Dimming from "./Dimming";

import styles from "../Header.module.css";

const Navigation = () => {
  const navContext = useContext(NavContext);

  const classNames = [styles.nav];
  if (navContext.isOpened) classNames.push(styles.navActive);

  return (
    <nav className={classNames.join(" ")}>
      {/* nav links */}
      <ul
        className={
          navContext.isOpened
            ? `${styles.navLinks} ${styles.navLinksActive}`
            : styles.navLinks
        }
      >
        <Link
          className={styles.navLink}
          to="/"
          onClick={() => navContext.setIsOpened(false)}
        >
          <li>Home</li>
        </Link>
      </ul>

      <AuthButtons />

      <Dimming />
    </nav>
  );
};

export default Navigation;
