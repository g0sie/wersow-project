import Loader from "../Loader/Loader";
import SuccessIcon from "../SuccessIcon/SuccessIcon";

import btnStyles from "./Button.module.css";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  loading: boolean;
  disabled?: boolean;
  type: "button" | "submit";
  className?: string;
  onClick?: () => void;
  success?: boolean;
}

const Button = (props: ButtonProps) => {
  const classNames = [
    styles.btnWithLoader,
    btnStyles.btn,
    btnStyles.btnBig,
    props?.className,
  ];

  let disabled;
  let children;

  if (props.success) {
    disabled = true;
    children = <SuccessIcon />;
    classNames.push(btnStyles.btnSuccess);
  } else if (props.loading) {
    disabled = true;
    children = <Loader />;
  } else {
    disabled = props.disabled;
    children = props.children;
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={classNames.join(" ")}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
