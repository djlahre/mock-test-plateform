import React, { useEffect, useRef, useState } from "react";
import { useField } from "formik";

export default function Input({ label, ...props }) {
  const inputRef = useRef();
  const [invalid, setInvalid] = useState(false);
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  useEffect(() => {
    if (
      inputRef.current.type === "password" &&
      inputRef.current.className.includes("is-invalid")
    ) {
      setInvalid(true);
    } else {
      setInvalid(false);
    }
  }, [error]);

  return (
    <>
      <label htmlFor={props.name} className="form-label fw-bold">
        {label}
      </label>
      <div className="input-group-lg">
        <input
          ref={inputRef}
          {...field}
          {...props}
          id={props.name}
          className={
            touched && error ? "form-control is-invalid" : "form-control"
          }
          required
        />
        {props.type === "password" ? (
          <ToggleEye inputRef={inputRef} invalid={invalid} />
        ) : null}
        <div className="invalid-feedback">{error}</div>
      </div>
    </>
  );
}

const ToggleEye = ({ inputRef, invalid }) => {
  const [show, setShow] = useState(false);
  const toggleInput = () => {
    if (inputRef.current.type === "password") inputRef.current.type = "text";
    else inputRef.current.type = "password";
    setShow(!show);
  };

  const eyeStyle = {};

  if (invalid) {
    eyeStyle.marginTop = "-3.6rem";
    eyeStyle.color = "red";
  } else {
    eyeStyle.marginTop = "-2.6rem";
    eyeStyle.color = "gray";
  }

  if (show) {
    return (
      <i
        style={eyeStyle}
        className="fas fa-eye-slash eye"
        onClick={toggleInput}
      ></i>
    );
  } else {
    return (
      <i style={eyeStyle} className="fas fa-eye eye" onClick={toggleInput}></i>
    );
  }
};
