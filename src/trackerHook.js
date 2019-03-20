import React from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';
import { defaultArea } from './constants';

export const usePromiseTracker = (config = {area: defaultArea, delay: 0}) => {
  const [internalPromiseInProgress, setInternalPromiseInProgress] = React.useState(false)
  const [promiseInProgress, setPromiseInProgress]= React.useState(false);
  const latestInternalPromiseInProgress = React.useRef(internalPromiseInProgress);

  React.useEffect(()=> {
    latestInternalPromiseInProgress.current = internalPromiseInProgress;
    emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, areaAffected) => {
      if(config.area === areaAffected) {
        setInternalPromiseInProgress(anyPromiseInProgress);
        if(!anyPromiseInProgress) {
          setPromiseInProgress(anyPromiseInProgress);
        } else {
          setTimeout(() => {
            // Check here ref to internalPromiseInProgress
            if(latestInternalPromiseInProgress.current === true) {
              setPromiseInProgress(anyPromiseInProgress);
            }
          }, config.delay);
        }
      }
    });

    return () => {emitter.off(promiseCounterUpdateEventId);
    }
  },[]);

  return {promiseInProgress}
}
