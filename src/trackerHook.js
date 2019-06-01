import React from "react";
import { PROGRESS_UPDATE } from "./constants";
import { makeSafeConfig } from './utils';
import { emitter, inProgress} from "./trackPromise";

const auxInitialState = {timeoutId: null, firstTime: null}

export const usePromiseTracker = (configuration) => {
  // Memoize a safe configuration & progress update event name.
  const config = React.useMemo(() => makeSafeConfig(configuration), [configuration]);
  const updateEvent = React.useMemo(() => event(PROGRESS_UPDATE, config.group), [config.group]);

  // Create state for progress (boolean).
  const [progress, setProgress] = React.useState(undefined);

  // Create ref to hold throttle aux variables.
  const aux = React.useRef(auxInitialState);

  // Throttled setProgress implementation.
  const throttledSetProgress = React.useCallback(progressStatus => {
    const now = Date.now();
    if(!aux.current.firstTime) aux.current.firstTime = now;
    const remaining = config.delay - (now - aux.current.firstTime);
    clearTimeout(aux.current.timeoutId);
    aux.current.timeoutId = setTimeout(() => {
      aux.current = auxInitialState;
      setProgress(progressStatus);
    }, remaining);
  }, [config.delay]);

  // Update progress callback.
  const updateProgress = React.useCallback(progressStatus => {
    if(progressStatus) throttledSetProgress(progressStatus);
    else setProgress(progressStatus);
  }, [throttledSetProgress]);

  // Subscribe on first render / clear subscription on last render.
  React.useEffect(() => {
    emitter.on(updateEvent, updateProgress); // Subscribe.
    updateProgress(inProgress(config.group)); // Simulate first update.
    return () => {
      emitter.off(updateEvent); // Unsubscribe.
      clearTimeout(aux.current.timeoutId); // Clean pending/throttled updates.
    }
  }, [updateEvent, updateProgress, config.group]);

  return { progress };
};
