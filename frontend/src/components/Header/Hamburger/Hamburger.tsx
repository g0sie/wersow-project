import { useContext } from "react";

import { NavContext } from "../../../context/NavContext";

import styles from "./Hamburger.module.css";

const Hamburger = () => {
  const nav = useContext(NavContext);

  const lineClassNames = [styles.line];
  if (nav.isOpened) lineClassNames.push(styles.lineCross);

  return (
    <button
      className={styles.hamburger}
      onClick={nav.toggle}
      data-testid="hamburger"
    >
      <div className={lineClassNames.join(" ")}></div>
      <div className={lineClassNames.join(" ")}></div>
      <div className={lineClassNames.join(" ")}></div>
    </button>
  );
};

export default Hamburger;
