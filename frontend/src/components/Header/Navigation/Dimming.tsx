import { useContext } from "react";

import { NavContext } from "../../../context/NavContext";

import styles from "../Header.module.css";

const Dimming = () => {
  const nav = useContext(NavContext);

  const classNames = [styles.dimming];
  if (nav.isOpened) classNames.push(styles.dimmingActive);

  return (
    <div
      className={classNames.join(" ")}
      onClick={() => nav.setIsOpened(false)}
    ></div>
  );
};

export default Dimming;
