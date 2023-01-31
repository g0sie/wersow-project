import InputWithError from "../../components/forms/InputWithError";

interface EmailInputProps {
  setEmail: (email: string) => void;
  emailErrorMsg: string;
  setEmailErrorMsg: (message: string) => void;
  isEmailCorrect: boolean;
  setIsEmailCorrect: (isCorrect: boolean) => void;
  isNameCorrect: boolean;
  isPasswordCorrect: boolean;
  setIsReadyToSubmit: (isFormCorrect: boolean) => void;
}

const EmailInput = (props: EmailInputProps) => {
  const handleEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputEmail = event.target.value;
    props.setEmail(inputEmail);
    props.setIsEmailCorrect(false);
    props.setIsReadyToSubmit(false);

    if ((inputEmail.match(/@/g) || []).length !== 1) {
      props.setEmailErrorMsg(
        "Email address should contain exactly one '@' sign"
      );
    } else if (inputEmail.includes(" ")) {
      props.setEmailErrorMsg("Email address shouldn't contain whitespaces");
    } else if (!/.+@/.test(inputEmail)) {
      props.setEmailErrorMsg("The username part of email address is invalid");
    } else if (!/@.+[.]+.+/.test(inputEmail)) {
      props.setEmailErrorMsg("The domain part of email address is invalid");
    } else {
      props.setIsEmailCorrect(true);
      props.setIsReadyToSubmit(props.isNameCorrect && props.isPasswordCorrect);
    }
  };

  return (
    <InputWithError
      label="email:"
      id="register-email"
      name="email"
      type="email"
      isValid={props.isEmailCorrect}
      errorMessage={props.emailErrorMsg}
      onChange={handleEmailInput}
    />
  );
};

export default EmailInput;
