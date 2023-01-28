import React from "react";

import formStyles from "./form.module.css";

interface InputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
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
        className={formStyles.input}
        required
      />
    </div>
  );
};

export default Input;
