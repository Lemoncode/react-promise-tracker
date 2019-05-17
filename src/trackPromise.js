import { Emitter } from "./tinyEmmiter";
import { PROGRESS_UPDATE, DEFAULT_GROUP } from "./constants";

export const emitter = new Emitter();

const countMap = {
  [DEFAULT_GROUP]: 0
};
export const getProgressCount = group => countMap[group];
const incrementCount = group => ++countMap[group] || (countMap[group] = 1, 1);
const decrementCount = group => --countMap[group];

export const trackPromise = (promise, group) => {
  group = group || DEFAULT_GROUP;
  emitter.emit(PROGRESS_UPDATE, incrementCount(group) > 0, group);

  const onResolveHandler = () => untrack(group);
  promise.then(onResolveHandler, onResolveHandler);

  return promise;
};

const untrack = group => {
  emitter.emit(PROGRESS_UPDATE, decrementCount(group) > 0, group);
};

// TODO: Enhancement we could catch here errors and throw an Event in case there's an HTTP Error
// then the consumer of this event can be listening and decide what to to in case of error
