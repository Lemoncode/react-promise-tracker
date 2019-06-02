import { Emitter } from './tinyEmitter';
import { PROGRESS_UPDATE, DEFAULT_GROUP } from './constants';
import { event } from './utils';

/**
 * Emitter singleton.
 */
export const emitter = new Emitter();

/**
 * Promise registry based on counters and its utility methods.
 */
const countMap = {};
const incrementCount = group => ++countMap[group] || ((countMap[group] = 1), 1);
const decrementCount = group => --countMap[group];
export const inProgress = group => {
  const counter = countMap[group || DEFAULT_GROUP];
  return Number.isInteger(counter) ? counter > 0 : undefined;
}

/**
 * Track a promise by increasing its group counter by one & programm its
 * untracking once the promise has settled.
 */
export const trackPromise = (promise, group) => {
  group = group || DEFAULT_GROUP;
  emitter.emit(event(PROGRESS_UPDATE, group), incrementCount(group) > 0);

  const onResolveHandler = () => untrack(group);
  promise.then(onResolveHandler, onResolveHandler);

  return promise;
};

/**
 * Untrack a promise by decrementing one to its group counter.
 */
const untrack = group => {
  emitter.emit(event(PROGRESS_UPDATE, group), decrementCount(group) > 0);
};

// TODO: Error management. Catch unhandled errors and throw events?
