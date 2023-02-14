import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../../context/NavContext";

import styles from "./NavLinks.module.css";

const NavLinks = () => {
  const nav = useContext(NavContext);

  const classNames = [styles.navLinks];
  if (nav.isOpened) classNames.push(styles.navLinksActive);

  return (
    <ul className={classNames.join(" ")}>
      <Link
        className={styles.navLink}
        to="/"
        onClick={() => nav.setIsOpened(false)}
      >
        <li>Home</li>
      </Link>
    </ul>
  );
};

export default NavLinks;
