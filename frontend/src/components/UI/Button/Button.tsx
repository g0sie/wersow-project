import Loader from "../Loader/Loader";

import buttonStyles from "./Button.module.css";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  waitingForResponse: boolean;
  disabled?: boolean;
  type: "button" | "submit";
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type}
      className={[styles.submitBtn, buttonStyles.btn, buttonStyles.btnBig].join(
        " "
      )}
      disabled={props.disabled || props.waitingForResponse}
    >
      {props.waitingForResponse ? <Loader /> : props.children}
    </button>
  );
};

export default Button;
