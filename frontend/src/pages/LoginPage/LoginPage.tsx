import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import useLoggedInUser from "../../hooks/queries/useLoggedInUser";

import Input from "../../components/forms/Input";
import Button from "../../components/UI/Button/Button";
import ErrorMessage from "../../components/forms/ErrorMessage";

import axios from "../../api";

import formStyles from "../../components/forms/form.module.css";
import pageStyles from "../Page.module.css";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { refetch: refetchUser } = useLoggedInUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [failedToLogIn, setFailedToLogIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("error");

  if (redirect) {
    return <Navigate to=".." />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWaitingForResponse(true);

    axios
      .post(
        "/users/login",
        { email, password },
        {
          withCredentials: true,
          validateStatus: (status) => [200, 403].includes(status),
        }
      )
      .then((res) => {
        switch (res.status) {
          case 200:
            refetchUser();
            setRedirect(true);
            break;
          case 403:
            showRightErrorMsg(res.data);
            console.log(res.data);
            break;
        }
        setWaitingForResponse(false);
      })
      .catch((error) => {
        setFailedToLogIn(true);
        setErrorMessage(
          "You found a problem. Contact with admin to solve that."
        );
        console.error(error.toJSON());
        setWaitingForResponse(false);
      });

    function showRightErrorMsg(responseData: any) {
      let errorMsg;

      switch (responseData) {
        case "User not found":
          errorMsg =
            "User with that email address doesn't belong to #teamsówki";
          break;
        case "Incorrect password": {
          errorMsg = "Try again with a correct password";
          break;
        }
        default:
          errorMsg = "Something went wrong...";
      }

      setFailedToLogIn(true);
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h2 className={formStyles.formHeading}>Sign in to join #teamsówki</h2>

        <Input
          label="email:"
          id="login-email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="password:"
          id="login-password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className={styles.submitBtn}
          type="submit"
          loading={waitingForResponse}
        >
          Sign in
        </Button>

        <ErrorMessage
          center={true}
          visible={failedToLogIn}
          message={errorMessage}
        />
      </form>
    </div>
  );
};

export default LoginPage;
