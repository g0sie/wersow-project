import { useState } from "react";

import Logo from "./Logo";
import Hamburger from "./Hamburger";
import Navigation from "./Navigation/Navigation";

import { NavContext } from "../../context/NavContext";

import styles from "./Header.module.css";

const Header = () => {
  const [isNavOpened, setIsNavOpened] = useState(false);

  const toggleNav = () => setIsNavOpened(!isNavOpened);

  return (
    <NavContext.Provider
      value={{
        isOpened: isNavOpened,
        setIsOpened: setIsNavOpened,
        toggle: toggleNav,
      }}
    >
      <header className={styles.header}>
        <Logo />
        <Navigation />
        <Hamburger />
      </header>
    </NavContext.Provider>
  );
};

export default Header;
