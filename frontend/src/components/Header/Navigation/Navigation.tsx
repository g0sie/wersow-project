import { useContext } from "react";
import { NavContext } from "../../../context/NavContext";

import NavLinks from "./NavLinks/NavLinks";
import AuthButtons from "./AuthButtons/AuthButtons";
import Dimming from "./Dimming";

import styles from "../Header.module.css";

const Navigation = () => {
  const navContext = useContext(NavContext);

  const classNames = [styles.nav];
  if (navContext.isOpened) classNames.push(styles.navActive);

  return (
    <nav className={classNames.join(" ")}>
      <NavLinks />

      <AuthButtons />

      <Dimming />
    </nav>
  );
};

export default Navigation;
