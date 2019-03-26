import React from "react";
import { promiseTrackerHoc } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

const SpinnerInner = (props) =>
    props.promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )

export const Spinner = promiseTrackerHoc(SpinnerInner);
