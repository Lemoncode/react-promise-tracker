import React from "react";
import { emitter, promiseCounterUpdateEventId,  getCounter} from "./trackPromise";
import { defaultConfig, setupConfig } from './setupConfig';


export const usePromiseTracker = (outerConfig = defaultConfig) => {
  // Included in state, it will be evaluated just the first time,
  // TODO: discuss if this is a good approach
  // We need to apply defensive programming, ensure area and delay default to secure data
  // cover cases like not all params informed, set secure defaults
  const [config] = React.useState(setupConfig(outerConfig));

  // Edge case, when we start the application if we are loading just onComponentDidMount
  // data, event emitter could have already emitted the event but subscription is not yet
  // setup
  React.useEffect(() => {
    if(config && config.area && getCounter(config.area) > 0) {
      setInternalPromiseInProgress(true);
      setPromiseInProgress(true);
    }
  }, config)

  // Internal will hold the current value
  const [
    internalPromiseInProgress,
    setInternalPromiseInProgress
  ] = React.useState(false);
  // Promise in progress is 'public', it can be affected by the _delay_ parameter
  // it may not show the current state
  const [promiseInProgress, setPromiseInProgress] = React.useState(false);

  // We need to hold a ref to latestInternal, to check the real value on
  // callbacks (if not we would get always the same value)
  // more info: https://overreacted.io/a-complete-guide-to-useeffect/
  const latestInternalPromiseInProgress = React.useRef(
    internalPromiseInProgress
  );

  const notifiyPromiseInProgress = () => {
    (!config || !config.delay || config.delay === 0) ?
      setPromiseInProgress(true)
    :
      setTimeout(() => {
        // Check here ref to internalPromiseInProgress
        if (latestInternalPromiseInProgress.current) {
          setPromiseInProgress(true);
        }
      }, config.delay);
  };

  const updatePromiseTrackerStatus = (anyPromiseInProgress, areaAffected) => {
    if (config.area === areaAffected) {
      setInternalPromiseInProgress(anyPromiseInProgress);
      // Update the ref object as well, we will check it when we need to
      // cover the _delay_ case (setTimeout)
      latestInternalPromiseInProgress.current = anyPromiseInProgress;
      if (!anyPromiseInProgress) {
        setPromiseInProgress(false);
      } else {
        notifiyPromiseInProgress();
      }
    }
  };

  React.useEffect(() => {
    latestInternalPromiseInProgress.current = internalPromiseInProgress;
    emitter.on(promiseCounterUpdateEventId,
      (anyPromiseInProgress, areaAffected) => {
        updatePromiseTrackerStatus(anyPromiseInProgress, areaAffected);
      }
    );

    return () => {
      emitter.off(promiseCounterUpdateEventId);
    };
  }, []);

  return { promiseInProgress };
};
