import Button from "../../../Button/Button";

import styles from "../../Header.module.css";

interface LogoutButtonProps {
  updateUser: () => void;
  turnOffNav: () => void;
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
    <div>
      <Button
        className={[styles.btn, styles.resetBtn, styles.navLink]}
        size="small"
        onClick={logOut}
      >
        Log out
      </Button>
    </div>
  );
};

export default LogoutButton;
