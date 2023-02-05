import InputWithError from "../../components/forms/InputWithError";

interface PasswordInputProps {
  setPassword: (password: string) => void;
  passwordErrorMsg: string;
  setPasswordErrorMsg: (message: string) => void;
  isPasswordCorrect: boolean;
  setIsPasswordCorrect: (isCorrect: boolean) => void;
  isNameCorrect: boolean;
  isEmailCorrect: boolean;
  setIsReadyToSubmit: (isFormCorrect: boolean) => void;
}

const PasswordInput = (props: PasswordInputProps) => {
  const handlePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = event.target.value;
    props.setPassword(inputPassword);
    props.setIsPasswordCorrect(false);
    props.setIsReadyToSubmit(false);

    if (inputPassword.startsWith(" ")) {
      props.setPasswordErrorMsg("Password shouldn't start with a whitespace");
    } else if (inputPassword.endsWith(" ")) {
      props.setPasswordErrorMsg("Password shouldn't end with a whitespace");
    } else if (inputPassword.length < 6) {
      props.setPasswordErrorMsg(
        "Password should consist of at least 6 characters"
      );
    } else if (inputPassword.length > 30) {
      props.setPasswordErrorMsg(
        "Password should consist of at most 30 characters"
      );
    } else {
      props.setIsPasswordCorrect(true);
      props.setIsReadyToSubmit(props.isNameCorrect && props.isEmailCorrect);
    }
  };

  return (
    <InputWithError
      label="password:"
      id="register-password"
      name="password"
      type="password"
      isValid={props.isPasswordCorrect}
      errorMessage={props.passwordErrorMsg}
      onChange={handlePasswordInput}
    />
  );
};

export default PasswordInput;
