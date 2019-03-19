import React from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';
import { defaultArea } from './constants';

export const usePromiseTracker = (area = defaultArea) => {
  const [promiseInProgress, setPromiseInProgress]= React.useState(false);

  React.useEffect(()=> {
    emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, areaAffected) => {
      // pending manage area
      if(area === areaAffected) {
        setPromiseInProgress(anyPromiseInProgress);
      }
    });

    return () => {emitter.off(promiseCounterUpdateEventId);
    }
  },[]);

  return {promiseInProgress}
}
