import React from 'react';
import { usePromiseTracker } from './trackerHook';

/**
 * HOC Usage variant.
 */
export const withPromiseTracker = Component => props => {
  const { progress } = usePromiseTracker(props.trackingConfig);
  return <Component {...props} progress={progress}/>;
}
