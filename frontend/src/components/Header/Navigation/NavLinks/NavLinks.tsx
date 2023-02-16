import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useLoggedInUser from "../../../../hooks/queries/useLoggedInUser";

import { NavContext } from "../../../../context/NavContext";

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
  const { data: user } = useLoggedInUser();
  const [accessibleLinks, setAccessibleLinks] = useState(Array<navLinkType>);

  const classNames = [styles.navLinks];
  if (nav.isOpened) classNames.push(styles.navLinksActive);

  useEffect(() => {
    let links = navLinks;
    if (!user) {
      links = navLinks.filter((navLink) => navLink.access === "public");
    }
    setAccessibleLinks(links);
  }, [user]);

  return (
    <ul className={classNames.join(" ")} data-testid="nav-links">
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
