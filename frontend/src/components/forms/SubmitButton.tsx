import formStyles from "./form.module.css";
import buttonStyles from "../../assets/css/button.module.css";

interface SubmitButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`${formStyles.submitBtn} ${buttonStyles.btn} ${buttonStyles.btnBig}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default SubmitButton;
