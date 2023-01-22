import buttonStyles from "../../../../assets/css/button.module.css";
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
      <button className={buttonStyles.btn} onClick={logOut}>
        Log out
      </button>
    </div>
  );
};

export default LogoutButton;
