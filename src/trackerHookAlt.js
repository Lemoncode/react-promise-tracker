import React from "react";
import { PROGRESS_UPDATE } from "./constants";
import { emitter, getProgressCount} from "./trackPromise";
import { makeSafeConfig } from './utils';

export const usePromiseTrackerAlt = (configuration) => {
  // Make config safe / initialize.
  const config = React.useMemo(() => makeSafeConfig(configuration), [configuration]);

  // Create state for progress (boolean).
  const [progress, setProgress] = React.useState(undefined);

  // Create ref to hold throttle aux variables.
  const throttle = React.useRef({timeout: null, firstTime: null});

  // Throttled setProgress implementation.
  const throttledSetProgress = React.useCallback((progressStatus) => {
    const now = Date.now();
    if(!throttle.current.firstTime) throttle.current.firstTime = now;
    const remaining = config.wait - (now - throttle.current.firstTime);
    clearTimeout(throttle.current.timeout);
    throttle.current.timeout = setTimeout(() => {
      throttle.current = {timeout: null, firstTime: null};
      setProgress(progressStatus);
    }, remaining);
  }, [config.wait])

  const updateProgress = React.useCallback((progressStatus, targetGroup) => {
    if (config.group === targetGroup) {
      if(progressStatus) throttledSetProgress(progressStatus);
      else setProgress(progressStatus);
    }
  }, [config.group, throttledSetProgress]);

  // Emitter progress update event.
  // Subscribe on first render / clear subscription on last render.
  React.useEffect(() => {
    emitter.on(PROGRESS_UPDATE, updateProgress); // Subscribe.
    updateProgress(getProgressCount(config.group) > 0, config.group); // Simulate first update.
    return () => {
      emitter.off(PROGRESS_UPDATE); // Unsubscribe.
      clearTimeout(throttle.current.timeout); // Clean pending/throttled updates.
    }
  }, [updateProgress, config.group]);

  return { progress };
};
