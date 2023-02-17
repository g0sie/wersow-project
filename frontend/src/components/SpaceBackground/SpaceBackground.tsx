import { WithMousePositionProps } from "../../hoc/withMousePosition";
import withMousePosition from "../../hoc/withMousePosition";
import styles from "./SpaceBackground.module.css";

const SpaceBackground = (props: WithMousePositionProps) => {
  console.log(props.mouseX, props.mouseY);

  return (
    <section
      className={styles.background}
      style={{
        translate: `${props.mouseX / 150}px ${props.mouseY / 100}px`,
      }}
    >
      <div className={styles.starsSmall}></div>
      <div className={styles.starsMedium}></div>
      <div className={styles.starsLarge}></div>
    </section>
  );
};

export default withMousePosition(SpaceBackground);
