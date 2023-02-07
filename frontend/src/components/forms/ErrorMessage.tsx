import formStyles from "./form.module.css";

interface ErrorMessageProps {
  center?: boolean;
  visible: boolean;
  message: string;
  className?: string;
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const className = props.center
    ? `${formStyles.errorMsg} ${formStyles.errorMsgCentered}`
    : formStyles.errorMsg;

  return (
    <p className={[className, props.className].join(" ")}>
      &zwnj;
      {props.visible && props.message}
    </p>
  );
};

export default ErrorMessage;
