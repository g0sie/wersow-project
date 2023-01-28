import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import Input from "../components/forms/Input";

import buttonStyles from "../assets/css/button.module.css";
import formStyles from "../components/forms/form.module.css";
import pageStyles from "./Page.module.css";

const LoginPage = (props: { updateUser: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      "https://wersow-api.herokuapp.com/users/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (response.ok) {
      props.updateUser();
      setRedirect(true);
    } else setSomethingWentWrong(true);
  };

  if (redirect) {
    return <Navigate to=".." />;
  }

  return (
    <div className={`${pageStyles.page} ${pageStyles.pageCentered}`}>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <h2 className={formStyles.formHeading}>Sign in to join #teamsówki</h2>

        {/* EMAIL */}
        <Input
          label="email:"
          id="login-email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <Input
          label="password:"
          id="login-password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className={`${formStyles.submitBtn} ${buttonStyles.btn} ${buttonStyles.btnBig}`}
        >
          Sign in
        </button>

        {/* ERROR MESSAGE */}
        <p className={`${formStyles.errorMsg} ${formStyles.errorMsgCentered}`}>
          &zwnj;
          {somethingWentWrong &&
            "Something went wrong... Try again with different data"}
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
