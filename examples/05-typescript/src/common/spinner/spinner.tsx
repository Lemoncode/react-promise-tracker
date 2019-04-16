import * as React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import './spinner.css';

export const Spinner: React.FunctionComponent = () => {
  const { promiseInProgress } = usePromiseTracker(null);

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
      </div>
    )
  );
};
