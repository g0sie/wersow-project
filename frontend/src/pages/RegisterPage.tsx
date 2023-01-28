import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import SubmitButton from "../components/forms/SubmitButton";
import ErrorMessage from "../components/forms/ErrorMessage";
import InputWithError from "../components/forms/InputWithError";

import formStyles from "../components/forms/form.module.css";
import pageStyles from "./Page.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameCorrect, setIsNameCorrect] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);

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
      setNameErrorMsg("Username should consist of at least 3 characters");
    } else if (inputName.length > 30) {
      setNameErrorMsg("Username should consist of at most 30 characters");
    } else {
      setIsNameCorrect(true);
      setIsReadyToSubmit(isEmailCorrect && isPasswordCorrect);
    }
  };

  const handleEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    setIsEmailCorrect(false);
    setIsReadyToSubmit(false);

    if ((inputEmail.match(/@/g) || []).length !== 1) {
      setEmailErrorMsg("Email address should contain exactly one '@' sign");
    } else if (inputEmail.includes(" ")) {
      setEmailErrorMsg("Email address shouldn't contain whitespaces");
    } else if (!/.+@/.test(inputEmail)) {
      setEmailErrorMsg("The username part of email address is invalid");
    } else if (!/@.+[.]+.+/.test(inputEmail)) {
      setEmailErrorMsg("The domain part of email address is invalid");
    } else {
      setIsEmailCorrect(true);
      setIsReadyToSubmit(isNameCorrect && isPasswordCorrect);
    }
  };

  const handlePasswordInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputPassword = event.target.value;
    setPassword(inputPassword);
    setIsPasswordCorrect(false);
    setIsReadyToSubmit(false);

    if (inputPassword.startsWith(" ")) {
      setPasswordErrorMsg("Password shouldn't start with a whitespace");
    } else if (inputPassword.endsWith(" ")) {
      setPasswordErrorMsg("Password shouldn't end with a whitespace");
    } else if (inputPassword.length < 6) {
      setPasswordErrorMsg("Password should consist of at least 6 characters");
    } else if (inputPassword.length > 30) {
      setPasswordErrorMsg("Password should consist of at most 30 characters");
    } else {
      setIsPasswordCorrect(true);
      setIsReadyToSubmit(isNameCorrect && isEmailCorrect);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    const response = await fetch(
      "https://wersow-api.herokuapp.com/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    if (response.ok) setRedirect(true);
    else setSomethingWentWrong(true);
  };

  if (redirect) {
    return <Navigate to="../login" />;
  }

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h2 className={formStyles.formHeading}>Sign up to join #teamsówki</h2>

        <InputWithError
          label="username:"
          id="register-name"
          name="name"
          isValid={isNameCorrect}
          errorMessage={nameErrorMsg}
          onChange={handleNameInput}
        />

        <InputWithError
          label="email:"
          id="register-email"
          name="email"
          type="email"
          isValid={isEmailCorrect}
          errorMessage={emailErrorMsg}
          onChange={handleEmailInput}
        />

        <InputWithError
          label="password:"
          id="register-password"
          name="password"
          type="password"
          isValid={isPasswordCorrect}
          errorMessage={passwordErrorMsg}
          onChange={handlePasswordInput}
        />

        <SubmitButton disabled={!isReadyToSubmit}>Sign up</SubmitButton>

        <ErrorMessage
          center={true}
          visible={somethingWentWrong}
          message="Something went wrong... Try again with different data"
        />
      </form>
    </div>
  );
};

export default RegisterPage;
