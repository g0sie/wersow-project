import styles from "../../Header.module.css";

interface LogoutButtonProps {
  updateUser: () => void;
  turnOffNav: () => void;
  className: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const logOut = async () => {
    await fetch("https://wersow-api.herokuapp.com/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    props.updateUser();

    props.turnOffNav();
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.className}>Log out</button>
    </div>
  );
};

export default LogoutButton;
