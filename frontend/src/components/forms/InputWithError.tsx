import React from "react";

import ErrorMessage from "./ErrorMessage";

import formStyles from "./form.module.css";

interface InputWithErrorProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  isValid: boolean;
  errorMessage: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithError = (props: InputWithErrorProps) => {
  const className =
    props.isValid || props.errorMessage === ""
      ? formStyles.input
      : `${formStyles.input} ${formStyles.inputInvalid}`;

  const preventWhiteSpaceOnKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <div className={formStyles.inputGroup}>
      <label className={formStyles.label} htmlFor={props.id}>
        {props.label}
      </label>

      <input
        onChange={props.onChange}
        id={props.id}
        name={props.name}
        type={props.type}
        className={className}
        onKeyDown={
          props.type === "email" ? preventWhiteSpaceOnKeyDown : undefined
        }
        required
      />

      <ErrorMessage visible={!props.isValid} message={props.errorMessage} />
    </div>
  );
};

export default InputWithError;
