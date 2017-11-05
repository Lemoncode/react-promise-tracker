
// Based on:
// https://github.com/scottcorgan/tiny-emitter
// class based

const isEventValid = (event) => {
  return event;
};

const getOrCreateEventSubscribersFor = (allEventSubscribers, event) => 
  getEventSubscribersFor(event) ? getEventSubscribersFor(event) : createEventSubscribersFor(event);

const getEventSubscribersFor = (allEventSubscribers, event) => allEventSubscribers[event];

const createEventSubscribersFor = (allEventSubscribers, event) => (allEventSubscribers[event] = []);

const subscribeCallback = (eventSubscribers, callback, context, unsubscribeAfterCalled) => {
  callback.context = context;
  if (unsubscribeAfterCalled) {
    callback.off_event = true;
  }
  eventSubscribers.push(callback);
};

const unsubscribeCallback = (allEventSubscribers, event, callbackToRemove) => {
  if (!callbackToRemove) {
    delete allEventSubscribers[event];
  } else {
    allEventSubscribers[event] = allEventSubscribers[event].filter((callback) => callback !== callbackToRemove);
  }
};

const signalSubscribers = (eventSubscribers, ...args) => {
  const callbacksToUnsubscribeAfterCalled = [];
  eventSubscribers.each((callback) => {
    callback.apply(callback.context, [...args]);
    if (callback.off_event) {
      callbacksToUnsubscribeAfterCalled.push(callback);
    }
  });
  return callbacksToUnsubscribeAfterCalled;
};


export class Emitter {

  emit(event, ...args) {
    const allEventSubscribers = this;
    if (isEventValid(event)) {
      const eventSubscribers = getEventSubscribersFor(event);
      if (eventSubscribers) {
        const callbacksToUnsubscribe = signalSubscribers(eventSubscribers, [...args]);
        callbacksToUnsubscribe.each((callback) => {
          unsubscribeCallback(allEventSubscribers, event, callback);
        });
      }
    }
    return this;
  }

  on(event, callback, context) {
    const allEventSubscribers = this;
    if (isEventValid(event)) {
      const eventSubscribers = getOrCreateEventSubscribersFor(allEventSubscribers, event);
      subscribeCallback(eventSubscribers, callback, context);
    }
    return this;
  }

  once(event, callback, context) {
    const allEventSubscribers = this;
    const unsubscribeAfterCalled = true;
    if (isEventValid(event)) {
      const eventSubscribers = getOrCreateEventSubscribersFor(allEventSubscribers, event);
      subscribeCallback(eventSubscribers, callback, context, unsubscribeAfterCalled);
    }
    return this;
  }

  off(event, callback) {
    const allEventSubscribers = this;
    if (isEventValid(event)) {
      const eventSubscribers = getEventSubscribersFor(event);
      if (eventSubscribers) {
        unsubscribeCallback(allEventSubscribers, event, callback);
      }
    }
    return this;
  }

  _e(e) {
    return getOrCreateEventSubscribersFor(e);
  }
}
