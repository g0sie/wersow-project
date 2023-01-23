import styles from "../Header.module.css";

interface DimmingProps {
  isNavActive: boolean;
  turnOffNav: () => void;
}

const Dimming = (props: DimmingProps) => {
  return (
    <div
      className={
        props.isNavActive
          ? `${styles.dimming} ${styles.dimmingActive}`
          : styles.dimming
      }
      onClick={props.turnOffNav}
    ></div>
  );
};

export default Dimming;
