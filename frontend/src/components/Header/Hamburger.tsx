import { useContext } from "react";

import { NavContext } from "../../context/NavContext";

import styles from "./Header.module.css";

const Hamburger = () => {
  const nav = useContext(NavContext);

  const lineClassNames = [styles.hamburgerLine];
  if (nav.isOpened) lineClassNames.push(styles.hamburgerLineActive);

  return (
    <button className={styles.hamburger} onClick={nav.toggle}>
      <div className={lineClassNames.join(" ")}></div>
      <div className={lineClassNames.join(" ")}></div>
      <div className={lineClassNames.join(" ")}></div>
    </button>
  );
};

export default Hamburger;
