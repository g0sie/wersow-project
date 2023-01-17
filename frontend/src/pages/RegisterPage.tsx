import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import Button from "../components/Button/Button";

import formStyles from "../assets/css/form.module.css";
import pageStyles from "./Page.module.css";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleNameInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value);
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
            className={formStyles.input}
            required
          />
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

        <Button type="submit" size="big" className={[formStyles.submitBtn]}>
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
