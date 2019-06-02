import React from 'react';
import * as trackPromiseAPI from './trackPromise';
import { usePromiseTracker } from './trackerHook';
import { randomBytes } from 'crypto';

/**
 * Config section.
 */
beforeEach(() => {
  jest.clearAllTimers();
  jest.useFakeTimers(); // Place it before each test.
});

afterEach(() => {
  jest.runAllTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

/**
 * Common stubs.
 */
const testGroup = 'testGroup';
const randomGroup = () => randomBytes(10).toString('hex');
const PROGRESS = 'PROGRESS';
const IDLE = 'IDLE';
const NO_TRACKING = 'noTracking';
const TrackingComponent = ({ group, delay }) => {
  const { progress } = usePromiseTracker({ group, delay });
  return progress === true ? <p>{PROGRESS}</p> :
    progress === false ? <p>{IDLE}</p> : <p>{NO_TRACKING}</p>;
};
const createFakePromise = (duration = 1000) =>
  new Promise(resolve => setTimeout(() => resolve()), duration);

/**
 * Test suites
 */
describe('usePromiseTracker', () => {
  describe('basic testing', () => {
    it('renders without crashing', () => {
      // Arrange & Act
      const component = mount(<TrackingComponent />);

      // Assert
      expect(component).toMatchSnapshot();
    });

    it('renders NO TRACKING when no promise is tracked yet for the target group', () => {
      // Arrange & Act
      const component = mount(<TrackingComponent group={randomGroup()} />);

      // Assert
      expect(component.text()).toEqual(NO_TRACKING);
    });

    it('renders PROGRESS when the tracked promise is pending', () => {
      // Arrange
      const promise = createFakePromise(10);
      trackPromiseAPI.trackPromise(promise, testGroup);

      // Act
      const component = mount(<TrackingComponent group={testGroup} />);

      // Assert
      expect(component.text()).toEqual(PROGRESS);
    });

    it('renders IDLE once the tracked promise has settled', done => {
      // Arrange
      const promise = createFakePromise(10);
      trackPromiseAPI.trackPromise(promise, testGroup);

      // Act
      const component = mount(<TrackingComponent group={testGroup} />);
      jest.runAllTimers();

      // Assert
      promise.then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      })
    });
  });

  describe('several promises tracked', () => {
    it('renders PROGRESS -> IDLE with multiple overlapping promises, tracked before mount', done => {
      // Arrange
      const group = randomGroup();
      const promiseA = createFakePromise(10);
      const promiseB = createFakePromise(20);

      // Act & Assert
      trackPromiseAPI.trackPromise(promiseA, group);
      trackPromiseAPI.trackPromise(promiseB, group);

      // 1. Mount. Expect PROGRESS.
      const component = mount(<TrackingComponent group={group} />);
      expect(component.text()).toEqual(PROGRESS);

      // 2. First promise settled, second one still pending. Expect PROGRESS.
      jest.advanceTimersByTime(15);
      expect(component.text()).toEqual(PROGRESS);

      // 3. Both promises settled. Expect IDLE.
      jest.runAllTimers();
      Promise.all([promiseA, promiseB]).then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      })
    });

    it('renders NO_TRACKING -> PROGRESS -> IDLE with multiple overlapping promises, tracked after mount', done => {
      // Arrange
      const group = randomGroup();
      const promiseA = createFakePromise(10);
      const promiseB = createFakePromise(20);

      // Act & Assert
      const component = mount(<TrackingComponent group={group} />);

      // 1. On mount, no promises tracked. Expect NO_TRACKING.
      expect(component.text()).toEqual(NO_TRACKING);

      // 2. Now track promises. Expect PROGRESS.
      trackPromiseAPI.trackPromise(promiseA, group);
      trackPromiseAPI.trackPromise(promiseB, group);
      expect(component.text()).toEqual(PROGRESS);

      // 3. First promise settled, second one still pending. Expect PROGRESS.
      jest.advanceTimersByTime(15);
      expect(component.text()).toEqual(PROGRESS);

      // 4. Both promises settled. Expect IDLE.
      jest.runAllTimers();
      Promise.all([promiseA, promiseB]).then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      })
    });

    it('renders NO_TRACKING -> PROGRESS -> IDLE -> PROGRESS -> IDLE with multiple non-overlapping promises', done => {
      // Arrange
      const group = randomGroup();
      const promiseA = createFakePromise(10);

      // Act & Assert
      const component = mount(<TrackingComponent group={group} />);

      // 1. On mount, no promises tracked. Expect NO_TRACKING.
      expect(component.text()).toEqual(NO_TRACKING);

      // 2. Track promise A. Expect PROGRESS.
      trackPromiseAPI.trackPromise(promiseA, group);
      expect(component.text()).toEqual(PROGRESS);

      // 3. Let promise A resolve. Expect IDLE.
      jest.runOnlyPendingTimers();
      promiseA.then(() => {
        expect(component.text()).toEqual(IDLE);

        // 4. Track promise B. Expect PROGRESS.
        const promiseB = createFakePromise(10);
        trackPromiseAPI.trackPromise(promiseB, group);
        expect(component.text()).toEqual(PROGRESS);

        // 5. Let promise B resolve. Expect IDLE.
        jest.runAllTimers();
        promiseB.then(() => {
          expect(component.text()).toEqual(IDLE);
          done();
        });
      });
    });
  });

  describe('delay timing', () => {
    it('renders NO_TRACKING -> PROGRESS -> IDLE with active delay, promise tracked before mount', done => {
      // Arrange
      const group = randomGroup();
      const promise = createFakePromise(50);

      // Act & Assert

      // 1. Track promise and Mount. Expect NO_TRACKING.
      trackPromiseAPI.trackPromise(promise, group);
      const component = mount(<TrackingComponent group={group} delay={20} />);
      expect(component.text()).toEqual(NO_TRACKING);

      // 2. Delay window completed. Expect PROGRESS.
      jest.advanceTimersByTime(25);
      expect(component.text()).toEqual(PROGRESS);

      // 3. Settled promise. Expect IDLE.
      jest.runAllTimers();
      promise.then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      });
    });

    it('renders NO_TRACKING -> PROGRESS -> IDLE with active delay, promise tracked after mount', done => {
      // Arrange
      const group = randomGroup();
      const promise = createFakePromise(50);

      // Act & Assert

      // 1. Mount. Expect NO_TRACKING.
      const component = mount(<TrackingComponent group={group} delay={20} />);
      expect(component.text()).toEqual(NO_TRACKING);

      // 2. Track promise. Expect NO_TRACKING.
      trackPromiseAPI.trackPromise(promise, group);
      expect(component.text()).toEqual(NO_TRACKING);

      // 3. Delay window completed. Expect PROGRESS.
      jest.advanceTimersByTime(25);
      expect(component.text()).toEqual(PROGRESS);

      // 4. Settled promise. Expect IDLE.
      jest.runAllTimers();
      promise.then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      });
    });
  });
});
