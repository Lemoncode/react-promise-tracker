import React from "react";
import { Link } from "react-router-dom";
import { usePromiseTracker } from "../../../../build/es";
import { PromiseControl } from "../common/components";

export const AnotherPage = () => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    <div>
      <h2>Another Page</h2>
      <h3>Promise {promiseInProgress ? "" : "not"} in progress</h3>
      <PromiseControl />
      <br />
      <Link to="/post">Navigate to Posts Page</Link>
    </div>
  );
};
