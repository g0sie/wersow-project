import InputWithError from "../../components/forms/InputWithError";

interface NameInputProps {
  setName: (name: string) => void;
  nameErrorMsg: string;
  setNameErrorMsg: (message: string) => void;
  isNameCorrect: boolean;
  setIsNameCorrect: (isCorrect: boolean) => void;
  isEmailCorrect: boolean;
  isPasswordCorrect: boolean;
  setIsReadyToSubmit: (isFormCorrect: boolean) => void;
}

const NameInput = (props: NameInputProps) => {
  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputName = event.target.value;
    props.setName(inputName);
    props.setIsNameCorrect(false);
    props.setIsReadyToSubmit(false);

    if (inputName.startsWith(" ")) {
      props.setNameErrorMsg("Username shouldn't start with a whitespace");
    } else if (inputName.endsWith(" ")) {
      props.setNameErrorMsg("Username shouldn't end with a whitespace");
    } else if (inputName.length < 3) {
      props.setNameErrorMsg("Username should consist of at least 3 characters");
    } else if (inputName.length > 30) {
      props.setNameErrorMsg("Username should consist of at most 30 characters");
    } else {
      props.setIsNameCorrect(true);
      props.setIsReadyToSubmit(props.isEmailCorrect && props.isPasswordCorrect);
    }
  };

  return (
    <InputWithError
      label="username:"
      id="register-name"
      name="name"
      isValid={props.isNameCorrect}
      errorMessage={props.nameErrorMsg}
      onChange={handleNameInput}
    />
  );
};

export default NameInput;
