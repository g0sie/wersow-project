import { Link } from "react-router-dom";

import AuthButtons from "./AuthButtons/AuthButtons";
import Dimming from "./Dimming";

import styles from "../Header.module.css";

interface NavigationProps {
  isNavActive: boolean;
  turnOffNav: () => void;
  updateUser: () => void;
}

const Navigation = (props: NavigationProps) => {
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
      </ul>

      <AuthButtons
        isNavActive={props.isNavActive}
        updateUser={props.updateUser}
        turnOffNav={props.turnOffNav}
      />

      <Dimming isNavActive={props.isNavActive} turnOffNav={props.turnOffNav} />
    </nav>
  );
};

export default Navigation;
