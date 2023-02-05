import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import SubmitButton from "../../components/forms/SubmitButton/SubmitButton";
import ErrorMessage from "../../components/forms/ErrorMessage";

import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";

import axios from "../../api";

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

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [failedToRegister, setFailedToRegister] = useState(false);
  const [registerErrorMsg, setRegisterErrorMsg] = useState("error");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setWaitingForResponse(true);

    axios
      .post(
        "/users/register",
        { name, email, password },
        { validateStatus: (status) => [201, 400].includes(status) }
      )
      .then((res) => {
        switch (res.status) {
          case 201:
            setRedirect(true);
            break;
          case 400:
            setFailedToRegister(true);
            showRightErrorMsg(res.data);
            break;
        }
        setWaitingForResponse(false);
      })
      .catch((error) => {
        setFailedToRegister(true);
        setRegisterErrorMsg(
          "You found a problem. Contact with admin to solve that."
        );
        setWaitingForResponse(false);
        console.error(error.toJSON());
      });

    function showRightErrorMsg(responseData: any) {
      let errorMsg;

      if (responseData.email) {
        errorMsg = "Try again with different email";
        if (
          responseData.email.includes("user with this email already exists.")
        ) {
          errorMsg =
            "User with that email address already signed up to #teamsówki";
        }
      } else if (responseData.name) {
        errorMsg = "Try again with different username";
      } else if (responseData.password) {
        errorMsg = "Try again with different password";
      } else {
        errorMsg = "Something went wrong...";
      }

      setFailedToRegister(true);
      setRegisterErrorMsg(errorMsg);
    }
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

        <SubmitButton
          disabled={!isReadyToSubmit}
          waitingForResponse={waitingForResponse}
        >
          Sign up
        </SubmitButton>

        <ErrorMessage
          center={true}
          visible={failedToRegister}
          message={registerErrorMsg}
        />
      </form>
    </div>
  );
};

export default RegisterPage;
