import { PROGRESS_UPDATE, DEFAULT_GROUP } from './constants';
import { event } from './utils';
import { trackPromise, inProgress, emitter } from './trackPromise';

/**
 * Config section.
 */
beforeEach(() => {
  jest.clearAllTimers();
  jest.useFakeTimers(); // Place it before each test.
});

afterAll(() => {
  jest.useRealTimers();
})

/**
 * Common stubs.
 */
const testGroup = 'testGroup';
const defaultUpdateEvent = event(PROGRESS_UPDATE, DEFAULT_GROUP);
const testUpdateEvent = event(PROGRESS_UPDATE, testGroup);

/**
 * Test suites.
 */
describe('trackPromise', () => {
  describe('returned promise', () => {
    it('must handle transparently the result when resolved', done => {
      // Arrange
      const expectedResult = 'promise result';
      const promise = Promise.resolve(expectedResult);

      // Act
      const returnPromise = trackPromise(promise);

      // Assert
      returnPromise.then(result => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });

    it('must handle transparently the error when rejected', done => {
      // Arrange
      const expectedResult = 'promise reject error';
      const promise = Promise.reject(expectedResult);

      // Act
      const returnPromise = trackPromise(promise);

      // Assert
      returnPromise.catch(result => {
        expect(result).toEqual(expectedResult);
        done();
      });
    });
  })

  describe ('default and custom group input', () => {
    it('emit event for default group if no group is informed', () => {
      // Arrange
      emitter.emit = jest.fn();
      const promise = Promise.resolve();

      // Act
      trackPromise(promise);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(defaultUpdateEvent, true);
    });

    it('emit event for default group if input group is null', () => {
      // Arrange
      emitter.emit = jest.fn();
      const promise = Promise.resolve();

      // Act
      trackPromise(promise, null);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(defaultUpdateEvent, true);
    });

    it('emit event for default group if input group is empty', () => {
      // Arrange
      emitter.emit = jest.fn();
      const promise = Promise.resolve();

      // Act
      trackPromise(promise, '');

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(defaultUpdateEvent, true);
    });

    it('emit event for custom group if input group is informed', () => {
      // Arrange
      emitter.emit = jest.fn();
      const promise = Promise.resolve();

      // Act
      trackPromise(promise, testGroup);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(testUpdateEvent, true);
    });
  });

  describe('emitter working as expected', () => {
    it('once promise is tracked, an update event is emitted', () => {
      // Arrange
      emitter.emit = jest.fn();
      const promise = Promise.resolve();

      // Act
      trackPromise(promise, testGroup);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(testUpdateEvent, true);
    });

    it('once promise is resolved, 2 update events are emitted in total', done => {
      // Arrange
      emitter.emit = jest.fn();
      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise, testGroup);

      // Assert
      myPromise.then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(2);
        expect(emitter.emit).toHaveBeenNthCalledWith(1, testUpdateEvent, true);
        expect(emitter.emit).toHaveBeenNthCalledWith(2, testUpdateEvent, false);
        done();
      });
    });

    it('once promise is rejected, 2 update events are emitted in total', done => {
      // Arrange
      emitter.emit = jest.fn();
      const myPromise = Promise.reject();

      // Act
      trackPromise(myPromise, testGroup);

      // Assert
      myPromise.catch(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(2);
        expect(emitter.emit).toHaveBeenNthCalledWith(1, testUpdateEvent, true);
        expect(emitter.emit).toHaveBeenNthCalledWith(2, testUpdateEvent, false);
        done();
      });
    });

    it('when 2 promises are tracked and resolved, 4 update events are emitted in total', done => {
      // Arrange
      emitter.emit = jest.fn();
      const promiseA = Promise.resolve();
      const promiseB = Promise.resolve();

      // Act
      trackPromise(promiseA, testGroup);
      trackPromise(promiseB, testGroup);

      // Assert
      Promise.all([promiseA, promiseB]).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(4);
        expect(emitter.emit).toHaveBeenNthCalledWith(1, testUpdateEvent, true);
        expect(emitter.emit).toHaveBeenNthCalledWith(2, testUpdateEvent, true);
        expect(emitter.emit).toHaveBeenNthCalledWith(3, testUpdateEvent, true);
        expect(emitter.emit).toHaveBeenNthCalledWith(4, testUpdateEvent, false);
        done();
      });
    });


  });

  it('when tracking promises in different groups, 2 separated update events are emitted', () => {
    // Arrange
    emitter.emit = jest.fn();
    const promiseA = Promise.resolve();
    const promiseB = Promise.resolve();

    // Act
    trackPromise(promiseA);
    trackPromise(promiseB, testGroup);

    // Assert
    Promise.all([promiseA, promiseB]).then(() => {
      expect(emitter.emit).toHaveBeenCalledTimes(4);
      expect(emitter.emit).toHaveBeenNthCalledWith(1, defaultUpdateEvent, true);
      expect(emitter.emit).toHaveBeenNthCalledWith(2, testUpdateEvent, true);
      expect(emitter.emit).toHaveBeenNthCalledWith(3, defaultUpdateEvent, false);
      expect(emitter.emit).toHaveBeenNthCalledWith(4, testUpdateEvent, false);
      done();
    });
  });
});

describe('inProgress', () => {
  it('should return undefined if no promise has ever tracked yet for the input group', () => {
    // Arrange
    emitter.emit = jest.fn();

    // Act
    const result = inProgress('neverUsedBeforeGroup');

    // Assert
    expect(result).toEqual(undefined);
  });

  it('should return true if a tracked promise is pending', () => {
    // Arrange
    emitter.emit = jest.fn();
    const promise = Promise.resolve();

    // Act
    trackPromise(promise, testGroup);
    const result = inProgress(testGroup);

    // Assert
    expect(result).toEqual(true);
  });

  it('should return false if a tracked promise has settled', done => {
    // Arrange
    emitter.emit = jest.fn();
    const promise = Promise.resolve();

    // Act
    trackPromise(promise, testGroup);

    // Act & Assert
    promise.then(() => {
      const result = inProgress(testGroup);
      expect(result).toEqual(false);
      done();
    })
  });
});
