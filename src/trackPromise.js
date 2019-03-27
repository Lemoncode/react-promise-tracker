import { Emitter } from "./tinyEmmiter";
import { defaultArea } from "./constants";

export const emitter = new Emitter();
export const promiseCounterUpdateEventId = "promise-counter-update";

let counter = {
  [defaultArea]: 0
};

export const getCounter = area => counter[area];

export const trackPromise = (promise, area) => {
  area = area || defaultArea;
  incrementCounter(area);

  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);

  const onResolveHandler = () => decrementPromiseCounter(area);
  promise.then(onResolveHandler, onResolveHandler);

  return promise;
};

const incrementCounter = area => {
  if (Boolean(counter[area])) {
    counter[area]++;
  } else {
    counter[area] = 1;
  }
};

const anyPromiseInProgress = area => counter[area] > 0;

const decrementPromiseCounter = area => {
  decrementCounter(area);
  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

const decrementCounter = area => {
  counter[area]--;
};

// TODO: Enhancement we could catch here errors and throw an Event in case there's an HTTP Error
// then the consumer of this event can be listening and decide what to to in case of error
