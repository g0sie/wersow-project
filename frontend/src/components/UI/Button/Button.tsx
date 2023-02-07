import Loader from "../Loader/Loader";

import buttonStyles from "./Button.module.css";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  waitingForResponse: boolean;
  disabled?: boolean;
  type: "button" | "submit";
  className?: string;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const classNames = [
    styles.btnWithLoader,
    buttonStyles.btn,
    buttonStyles.btnBig,
    props?.className,
  ];

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={classNames.join(" ")}
      disabled={props.disabled || props.waitingForResponse}
    >
      {props.waitingForResponse ? <Loader /> : props.children}
    </button>
  );
};

export default Button;
