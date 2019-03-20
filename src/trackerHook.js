import React from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';
import { defaultArea } from './constants';

export const usePromiseTracker = (config = {area: defaultArea, delay: 0}) => {
  const [promiseInProgress, setPromiseInProgress]= React.useState(false);

  React.useEffect(()=> {
    emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, areaAffected) => {
      if(config.area === areaAffected) {
        setPromiseInProgress(anyPromiseInProgress);
      }
    });

    return () => {emitter.off(promiseCounterUpdateEventId);
    }
  },[]);

  return {promiseInProgress}
}
