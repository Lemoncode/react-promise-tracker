import React from "react";
import Loader from "react-loader-spinner";
import { usePromiseTracker } from "../../../../../../build/es";
import "./spinner.css";

export const Spinner = () => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />
      </div>
    )
  );
};
