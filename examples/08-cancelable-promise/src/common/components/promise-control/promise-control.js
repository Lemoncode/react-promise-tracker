import React from "react";
import {
  manuallyDecrementPromiseCounter,
  manuallyIncrementPromiseCounter
} from "../../../../../../build/es";
import "./promise-control.css";

const Button = ({ title, onClick, className }) => (
  <button className={`button ${className}`} onClick={onClick}>
    {title}
  </button>
);

export const PromiseControl = () => {
  return (
    <>
      <Button
        title="Decrement"
        onClick={() => manuallyDecrementPromiseCounter()}
        className="decrement"
      />
      <Button
        title="Increment"
        onClick={() => manuallyIncrementPromiseCounter()}
        className="increment"
      />
    </>
  );
};
