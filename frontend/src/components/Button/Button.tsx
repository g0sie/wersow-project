import styles from "./Button.module.css";

interface ButtonProps {
  children?: string;
  type?: "submit";
  size: "small" | "big";
  className?: string[];
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const getClassNames = () => {
    let classNames: string[] = [styles.btn];
    if (props.className !== undefined) classNames.push(...props.className);
    if (props.size === "big") classNames.push(styles.btnBig);
    return classNames.join(" ");
  };

  return (
    <button
      className={getClassNames()}
      type={props.type ? props.type : "button"}
      disabled={props.disabled}
    >
      {props?.children}
    </button>
  );
};

export default Button;
