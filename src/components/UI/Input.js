import React from "react";
import { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const getCurrValue = () => inputRef.current.value;

  useImperativeHandle(ref, () => {
    return {
      value: getCurrValue,
    };
  });

  return (
    <div className={props.className || classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={inputRef} {...props.input} />
    </div>
  );
});

export default Input;
