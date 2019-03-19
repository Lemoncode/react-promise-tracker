import React from 'react';
import { promiseTrackerHoc } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

const InnerSpinner = (props) => (
  props.trackedPromiseInProgress &&
  <div className="spinner">
    <Loader
      type="ThreeDots"
      color="#2BAD60"
      height="100"
      width="100"
    />
  </div>
);

export const Spinner = promiseTrackerHoc(InnerSpinner);