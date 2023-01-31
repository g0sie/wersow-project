import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import SubmitButton from "../../components/forms/SubmitButton";
import ErrorMessage from "../../components/forms/ErrorMessage";

import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

import formStyles from "../../components/forms/form.module.css";
import pageStyles from "../Page.module.css";

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

        <NameInput
          setName={setName}
          nameErrorMsg={nameErrorMsg}
          setNameErrorMsg={setNameErrorMsg}
          isNameCorrect={isNameCorrect}
          setIsNameCorrect={setIsNameCorrect}
          isEmailCorrect={isEmailCorrect}
          isPasswordCorrect={isPasswordCorrect}
          setIsReadyToSubmit={setIsReadyToSubmit}
        />

        <EmailInput
          setEmail={setEmail}
          emailErrorMsg={emailErrorMsg}
          setEmailErrorMsg={setEmailErrorMsg}
          isEmailCorrect={isEmailCorrect}
          setIsEmailCorrect={setIsEmailCorrect}
          isNameCorrect={isNameCorrect}
          isPasswordCorrect={isPasswordCorrect}
          setIsReadyToSubmit={setIsReadyToSubmit}
        />

        <PasswordInput
          setPassword={setPassword}
          passwordErrorMsg={passwordErrorMsg}
          setPasswordErrorMsg={setPasswordErrorMsg}
          isPasswordCorrect={isPasswordCorrect}
          setIsPasswordCorrect={setIsPasswordCorrect}
          isNameCorrect={isNameCorrect}
          isEmailCorrect={isEmailCorrect}
          setIsReadyToSubmit={setIsReadyToSubmit}
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
