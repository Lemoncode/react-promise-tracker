import React from "react";
import { emitter, promiseCounterUpdateEventId } from "./trackPromise";
import { defaultArea } from "./constants";

// Defensive config setup
const setupConfig = (outerConfig) => ({
  area: (!outerConfig || !outerConfig.area) ? defaultArea : outerConfig.area,
  delay: (!outerConfig || !outerConfig.delay) ? 0 : outerConfig.delay,
})


export const usePromiseTracker = (outerConfig = { area: defaultArea, delay: 0 }) => {
  // Included in state, it will be evaluated just the first time,
  // TODO: discuss if this is a good approach
  // We need to apply defensive programming, ensure area and delay default to secure data
  // cover cases like not all params informed, set secure defaults
  const [config] = React.useState(setupConfig(outerConfig));

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
    (!config || !config.delay || config.delay == 0) ?
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
