import React from 'react';
import { render, screen } from '@testing-library/react';
import { promiseTrackerHoc } from './trackerHoc';
import * as trackPromiseAPI from './trackPromise';
import { defaultArea } from './constants';

const TestSpinnerComponent = (props) => (
  <pre>props: {JSON.stringify(props, null, 4)}</pre>
);

describe('trackerHoc', () => {
  describe('Initial Status', () => {
    it('should render component with trackedPromiseInProgress equals false and area equals "default-area" when render promiseTrackerHoc without props', () => {
      // Arrange

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false, area equals "default-area" and customProp equals "test" when feeding customProp equals "test"', () => {
      // Arrange

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent customProp="test" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea"', () => {
      // Arrange

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ area: 'testArea' }} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different area', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = false;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 0 and emit event with progress equals true', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different area', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = true;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 1', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true to different area', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = true;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals false', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals false to different area', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = false;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea" and delay equals 300', () => {
      // Arrange

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ area: 'testArea', delay: 300 }} />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different area and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = false;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals true when counter is 0 and emit event with progress equals true and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest
        .fn()
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));
      const setTimeoutStub = jest
        .spyOn(window, 'setTimeout')
        .mockImplementation((callback) => callback());

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different area and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(0);

      const progress = true;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals true and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals true to different area and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = true;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals false and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals false to different area and delay equals 300', () => {
      // Arrange
      trackPromiseAPI.getCounter = jest.fn().mockReturnValue(1);

      const progress = false;
      const area = 'otherArea';
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, 'on')
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const { asFragment } = render(
        <TrackedComponent config={{ delay: 300 }} />
      );

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('Handling delay timeouts', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should render <h1>NO SPINNER</h2> when counter is 1 but delay is set to 300 (before timing out)', async () => {
      // Arrange
      const TestSpinnerComponent = (props) => {
        return (
          <div>
            {props.promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      const getCounterStub = jest.spyOn(trackPromiseAPI, 'getCounter');

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);
      render(<TrackedComponent config={{ delay: 300 }} />);

      // Check very beginning (no promises going on) NO SPINNER is shown
      // TODO: this assert could be skipped (move to another test)
      expect(screen.getByText('NO SPINNER')).toBeInTheDocument();
      expect(getCounterStub).toHaveBeenCalled();

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

      jest.advanceTimersByTime(100);

      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

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
      expect(screen.queryByText('SPINNER')).not.toBeInTheDocument();
    });

    it('should render <h1>SPINNER</h2> when counter is 1, delay is set to 1000 and promise has 2000 timeout', async () => {
      // Arrange
      const TestSpinnerComponent = (props) => {
        return (
          <div>
            {props.promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      const getCounterStub = jest.spyOn(trackPromiseAPI, 'getCounter');

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);
      render(<TrackedComponent config={{ delay: 1000 }} />);

      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();
      expect(getCounterStub).toHaveBeenCalled();

      // Assert
      const myFakePromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      trackPromiseAPI.trackPromise(myFakePromise);

      jest.advanceTimersByTime(500);
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Total advance 1000
      jest.advanceTimersByTime(500);
      expect(await screen.findByText('SPINNER')).toBeInTheDocument();

      // Total advance 1999
      jest.advanceTimersByTime(999);
      expect(await screen.findByText('SPINNER')).toBeInTheDocument();

      // After the promise get's resolved
      jest.runAllTimers();

      await myFakePromise;
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Total advance 2010
      jest.advanceTimersByTime(11);
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();
    });

    it('should render <h1>NO SPINNER</h2> when counter is 1, delay is set to 2000 and promise has 1000 timeout', async () => {
      // Arrange
      const TestSpinnerComponent = (props) => {
        return (
          <div>
            {props.promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      const getCounterStub = jest.spyOn(trackPromiseAPI, 'getCounter');

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);
      render(<TrackedComponent config={{ delay: 2000 }} />);

      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();
      expect(getCounterStub).toHaveBeenCalled();

      // Assert
      const myFakePromise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      trackPromiseAPI.trackPromise(myFakePromise);

      jest.advanceTimersByTime(500);
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Total advance 1000
      jest.advanceTimersByTime(500);
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      await myFakePromise;
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // Total advance 1999
      jest.advanceTimersByTime(999);
      expect(await screen.findByText('NO SPINNER')).toBeInTheDocument();

      // After the promise get's resolved
      jest.runAllTimers();
    });
  });
});
