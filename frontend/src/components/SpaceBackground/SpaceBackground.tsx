import styles from "./SpaceBackground.module.css";

const SpaceBackground = () => {
  return (
    <section className={styles.background}>
      <div className={styles.starsSmall}></div>
      <div className={styles.starsMedium}></div>
      <div className={styles.starsLarge}></div>
    </section>
  );
};

export default SpaceBackground;
