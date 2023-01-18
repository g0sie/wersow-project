import { useState } from "react";

import { Navigate } from "react-router-dom";

import Button from "../components/Button/Button";

import formStyles from "../assets/css/form.module.css";
import pageStyles from "./Page.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameCorrect, setIsNameCorrect] = useState(false);
  //   const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  //   const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const [nameErrorMsg, setNameErrorMsg] = useState("");

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputName = event.target.value;
    setName(inputName);
    setIsNameCorrect(false);
    setIsReadyToSubmit(false);

    if (inputName.startsWith(" ")) {
      setNameErrorMsg("Username shouldn't start with a whitespace");
    } else if (inputName.endsWith(" ")) {
      setNameErrorMsg("Username shouldn't end with a whitespace");
    } else if (inputName.length < 3) {
      setNameErrorMsg("Username should have at least 3 characters");
    } else if (inputName.length > 30) {
      setNameErrorMsg("Username should have at most 30 characters");
    } else {
      setIsNameCorrect(true);
      setIsReadyToSubmit(true);
    }
  };

  const handleEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    await fetch("https://wersow-api.herokuapp.com/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="../login" />;
  }

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h2 className={formStyles.formHeading}>Sign up to join #teamsówki</h2>
        <div className={formStyles.inputGroup}>
          <label className={formStyles.label} htmlFor="login-name">
            username:
          </label>
          <input
            onChange={handleNameInput}
            id="login-name"
            name="name"
            className={`
              ${formStyles.input} 
              ${
                !isNameCorrect && nameErrorMsg !== "" && formStyles.inputInvalid
              }
            `}
            required
          />
          <p className={formStyles.errorMsg}>
            &zwnj;
            {isNameCorrect ? "" : nameErrorMsg}
          </p>
        </div>

        <div className={formStyles.inputGroup}>
          <label className={formStyles.label} htmlFor="login-email">
            email:
          </label>
          <input
            onChange={handleEmailInput}
            id="login-email"
            name="email"
            type="email"
            className={formStyles.input}
            required
          />
        </div>

        <div className={formStyles.inputGroup}>
          <label className={formStyles.label} htmlFor="login-email">
            password:
          </label>
          <input
            onChange={handlePasswordInput}
            id="login-password"
            name="password"
            type="password"
            className={formStyles.input}
            required
          />
        </div>

        <Button
          type="submit"
          size="big"
          className={[formStyles.submitBtn]}
          disabled={!isReadyToSubmit}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
