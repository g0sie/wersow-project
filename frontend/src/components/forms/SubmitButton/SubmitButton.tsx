import Loader from "../../UI/Loader/Loader";

import buttonStyles from "../../../assets/css/button.module.css";
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps {
  children: React.ReactNode;
  waitingForResponse: boolean;
  disabled?: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`${styles.submitBtn} ${buttonStyles.btn} ${buttonStyles.btnBig}`}
      disabled={props.disabled || props.waitingForResponse}
    >
      {props.waitingForResponse ? <Loader /> : props.children}
    </button>
  );
};

export default SubmitButton;
