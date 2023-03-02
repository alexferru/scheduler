// Imports
import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  // Generate class names based on component props
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  // Render a button element with appropriate props and children
  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
