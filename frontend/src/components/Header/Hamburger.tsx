import styles from "./Header.module.css";

interface HamburgerProps {
  isNavActive: boolean;
  toggleNav: () => void;
}

const Hamburger = (props: HamburgerProps) => {
  let hamburgerLineClassName;
  if (props.isNavActive) {
    hamburgerLineClassName = `${styles.hamburgerLine} ${styles.hamburgerLineActive}`;
  } else {
    hamburgerLineClassName = styles.hamburgerLine;
  }

  return (
    <button className={styles.hamburger} onClick={props.toggleNav}>
      <div className={hamburgerLineClassName}></div>
      <div className={hamburgerLineClassName}></div>
      <div className={hamburgerLineClassName}></div>
    </button>
  );
};

export default Hamburger;
