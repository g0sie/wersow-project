import { useState } from "react";

import Logo from "./Logo";
import Hamburger from "./Hamburger";
import Navigation from "./Navigation/Navigation";

import styles from "./Header.module.css";

const Header = (props: { updateUser: () => void }) => {
  const [isNavActive, setIsNavActive] = useState(false);

  const toggleNav = () => setIsNavActive(!isNavActive);
  const turnOffNav = () => {
    if (isNavActive) toggleNav();
  };

  return (
    <header className={styles.header}>
      <Logo turnOffNav={turnOffNav} />
      <Navigation
        isNavActive={isNavActive}
        turnOffNav={turnOffNav}
        updateUser={props.updateUser}
      />
      <Hamburger isNavActive={isNavActive} toggleNav={toggleNav} />
    </header>
  );
};

export default Header;
