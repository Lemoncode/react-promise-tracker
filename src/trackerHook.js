import React from "react";
import { emitter, promiseCounterUpdateEventId } from "./trackPromise";
import { defaultArea } from "./constants";

export const usePromiseTracker = (config = { area: defaultArea, delay: 0 }) => {
  const [
    internalPromiseInProgress,
    setInternalPromiseInProgress
  ] = React.useState(false);
  const [promiseInProgress, setPromiseInProgress] = React.useState(false);
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
