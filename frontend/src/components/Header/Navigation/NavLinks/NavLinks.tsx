import { useContext } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../../context/NavContext";

import styles from "./NavLinks.module.css";

type navLinkType = {
  name: string;
  to: string;
};

const navLinks: Array<navLinkType> = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "My Videos",
    to: "/videos",
  },
];

const NavLinks = () => {
  const nav = useContext(NavContext);

  const classNames = [styles.navLinks];
  if (nav.isOpened) classNames.push(styles.navLinksActive);

  return (
    <ul className={classNames.join(" ")}>
      {navLinks.map((navLink, index) => (
        <Link
          className={styles.navLink}
          to={navLink.to}
          key={index}
          onClick={() => nav.setIsOpened(false)}
        >
          <li>{navLink.name}</li>
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
