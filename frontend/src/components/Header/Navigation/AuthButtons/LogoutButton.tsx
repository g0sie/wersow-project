import axios from "../../../../api";

import styles from "../../Header.module.css";

interface LogoutButtonProps {
  updateUser: () => void;
  turnOffNav: () => void;
  className: string;
}

const LogoutButton = (props: LogoutButtonProps) => {
  const logOut = async () => {
    axios
      .post(
        "/users/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => {
        props.updateUser();
      })
      .catch((error) => {
        console.error(error.toJSON());
      });

    props.turnOffNav();
  };

  return (
    <div className={styles.navLink} onClick={logOut}>
      <button className={props.className}>Log out</button>
    </div>
  );
};

export default LogoutButton;
