import React from 'react';
import { renderHook, render, screen, act } from '@testing-library/react';
import * as trackPromiseAPI from './trackPromise';
import { usePromiseTracker } from './trackerHook';

describe('trackerHook', () => {
  describe('Initial Status', () => {
    it('should return promiseInProgress equals false on calls it', () => {
      // Arrange

      // Act
      const { result } = renderHook(() => usePromiseTracker());

      // Assert
      expect(result.current).toEqual({ promiseInProgress: false });
    });

    it('should return promiseInProgress equals false when counter is 0', () => {
      // Arrange
      const getCounterStub = jest
        .spyOn(trackPromiseAPI, 'getCounter')
        .mockImplementation(() => 0);

      // Act
      const { result } = renderHook(() => usePromiseTracker());

      // Assert
      expect(getCounterStub).toHaveBeenCalled();
      expect(result.current).toEqual({ promiseInProgress: false });
    });

    it('should return promiseInProgress equals false when counter is 0 and emit event with progress equals false to different area', () => {
      // Arrange
      const getCounterStub = jest
        .spyOn(trackPromiseAPI, 'getCounter')
        .mockImplementation(() => 0);

      const progress = false;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const { result } = renderHook(() => usePromiseTracker());

      // Assert
      expect(getCounterStub).toHaveBeenCalled();
      expect(result.current).toEqual({ promiseInProgress: false });
    });

    it('should return promiseInProgress equals false when counter is 0 and emit event with progress equals true to different area', () => {
      // Arrange
      const getCounterStub = jest
        .spyOn(trackPromiseAPI, 'getCounter')
        .mockImplementation(() => 0);

      const progress = true;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const { result } = renderHook(() => usePromiseTracker());

      // Assert
      expect(getCounterStub).toHaveBeenCalled();
      expect(result.current).toEqual({ promiseInProgress: false });
    });

    it('should return promiseInProgress equals true when counter is 1', () => {
      // Arrange
      const getCounterStub = jest
        .spyOn(trackPromiseAPI, 'getCounter')
        .mockImplementation(() => 1);

      // Act
      const { result } = renderHook(() => usePromiseTracker());

      // Assert
      expect(getCounterStub).toHaveBeenCalled();
      expect(result.current).toEqual({ promiseInProgress: true });
    });

    it('should return promiseInProgress equals false and area equals "testArea" when feeding area equals "testArea" and delay equals 300', () => {
      // Arrange

      // Act
      const { result } = renderHook(() =>
        usePromiseTracker({
          area: 'testArea',
          delay: 300,
        })
      );

      // Assert
      expect(result.current).toEqual({ promiseInProgress: false });
    });
  });

  describe('Handling delay timeouts', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return promiseInProgress equals false when counter is 1 but delay is set to 200 (before timing out)', async () => {
      // Arrange
      let TestSpinnerComponent = null;
      act(() => {
        TestSpinnerComponent = (props) => {
          // Do not show spinner in the first 200 milliseconds (delay)
          const { promiseInProgress } = usePromiseTracker({ delay: 200 });

          return (
            <div>
              {promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
            </div>
          );
        };
      });

      // Act
      render(<TestSpinnerComponent />);

      // Check very beginning (no promises going on) NO SPINNER is shown
      // TODO: this assert could be skipped (move to another test)
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Assert
      // This promise will resolved after 1 seconds, by doing this
      // we will be able to test 2 scenarios:
      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      // [1] after 200ms spinner will be shown (text SPINNER)
      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)
      const myFakePromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      trackPromiseAPI.trackPromise(myFakePromise);

      // Runs all pending timers. whether it's a second from now or a year.
      // https://jestjs.io/docs/en/timer-mocks.html
      jest.advanceTimersByTime(100);

      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Runs all pending timers. whether it's a second from now or a year.
      // https://jestjs.io/docs/en/timer-mocks.html
      jest.advanceTimersByTime(300);

      // Before the promise get's resolved
      // [1] after 200ms spinner will be shown (text SPINNER)
      expect(await screen.findByText('SPINNER')).toBeInTheDocument();

      // After the promise get's resolved
      jest.runAllTimers();

      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)
      // Wait for fakePromise (simulated ajax call) to be completed
      // no spinner should be shown
      await myFakePromise;
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();
    });
  });
});
