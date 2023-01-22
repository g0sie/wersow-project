import styles from "./Header.module.css";

const Hamburger = (props: { toggleNav: () => void }) => {
  return (
    <button className={styles.hamburger} onClick={props.toggleNav}>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
      <div className={styles.hamburgerLine}></div>
    </button>
  );
};

export default Hamburger;
