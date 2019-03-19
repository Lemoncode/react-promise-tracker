import React from 'react'
import { emitter, getCounter, promiseCounterUpdateEventId } from './trackPromise';

const usePromiseTracker = () => {
  const [promiseInProgress, setPromiseInProgress]= React.useState(false);
  // pending area

  React.useEffect(()=> {
    emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
      // pending manage area
      setPromiseInProgress(anyPromiseInProgress);
    });

    return () => {emitter.off(promiseCounterUpdateEventId);
    }
  },[]);

  return {promiseInProgress}
}