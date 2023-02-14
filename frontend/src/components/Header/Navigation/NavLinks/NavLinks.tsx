import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { NavContext } from "../../../../context/NavContext";
import { LoggedInUserContext } from "../../../../context/LoggedInUserContext";

import styles from "./NavLinks.module.css";

type navLinkType = {
  name: string;
  to: string;
  access: "public" | "authenticated";
};

const navLinks: Array<navLinkType> = [
  {
    name: "Home",
    to: "/",
    access: "public",
  },
  {
    name: "My Videos",
    to: "/videos",
    access: "authenticated",
  },
];

const NavLinks = () => {
  const nav = useContext(NavContext);
  const { user: loggedInUser } = useContext(LoggedInUserContext);

  const [accessibleLinks, setAccessibleLinks] = useState(Array<navLinkType>);

  const classNames = [styles.navLinks];
  if (nav.isOpened) classNames.push(styles.navLinksActive);

  useEffect(() => {
    let links = navLinks;
    if (loggedInUser === null) {
      links = navLinks.filter((navLink) => navLink.access === "public");
    }
    setAccessibleLinks(links);
  }, [loggedInUser]);

  return (
    <ul className={classNames.join(" ")}>
      {accessibleLinks.map((navLink, index) => (
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
