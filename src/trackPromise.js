import { Emitter } from './tinyEmmiter';

export const emitter = new Emitter();
export const promiseCounterUpdateEventId = 'promise-counter-update';

let counter = {global: 0}

// TODO: Add unit test support
export const trackPromise = (promise, areaPromise = 'global') => {
  const area = getArea(areaPromise);

  // Todo encapsulate in a method called incrementCounter(areaName)
  incrementCounter(area);

  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress,getArea(areaPromise));

  promise
  .then(() => decrementPromiseCounter(area),
        () =>decrementPromiseCounter(area)
        );

  return promise;
};

const getArea = (areaPromise) => Boolean(areaPromise) ? areaPromise : areaPromise='global';

const incrementCounter = (area)=> ( counter[area] ? counter[area]++ : counter[area] = 1)

const decrementCounterArea = (area) => (counter[area]--);

const anyPromiseInProgress = (area) => (counter[area] > 0);

const decrementPromiseCounter = (area) => {
  decrementCounterArea(area);
  const promiseInProgress = anyPromiseInProgress(area);
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress, area);
};

// TODO: Enhancement we could catch here errors and throw an Event in case there's an HTTP Error
// then the consumer of this event can be listening and decide what to to in case of error
