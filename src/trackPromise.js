import { Emitter } from './tinyEmmiter';

export const emitter = new Emitter();
export const promiseCounterUpdateEventId = 'promise-counter-update';

let counter = 0;

// TODO: Add unit test support
export const trackPromise = (promise, areaPromise = 'global') => {
  counter++;
  const promiseInProgress = anyPromiseInProgress();
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress,getArea(areaPromise));

  promise
  .then(() => decrementPromiseCounter(),
        () =>decrementPromiseCounter()
        );

  return promise;
};

const getArea = (areaPromise) => areaPromise === '' ? areaPromise='global' : areaPromise;

const anyPromiseInProgress = () => (counter > 0);

const decrementPromiseCounter = () => {
  counter--;
  const promiseInProgress = anyPromiseInProgress();
  emitter.emit(promiseCounterUpdateEventId, promiseInProgress);
};

// TODO: Enhancement we could catch here errors and throw an Event in case there's an HTTP Error
// then the consumer of this event can be listening and decide what to to in case of error
