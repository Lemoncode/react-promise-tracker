import React from "react";
import * as trackPromiseAPI from "./trackPromise";
import { usePromiseTracker } from "./trackerHook";
import { act } from "react-dom/test-utils"; // ES6

/**
 * Config section
 */
beforeEach(() => {
  jest.clearAllTimers();
  jest.useFakeTimers(); // Place it before each test.
});

afterAll(() => {
  jest.useRealTimers();
})

/**
 * Common stubs
 */
const PROGRESS = "PROGRESS";
const IDLE = "IDLE";
const UNKNOWN = "unknown";
const TrackingComponent = ({group, delay}) => {
  const { promiseInProgress } = usePromiseTracker({ group, delay });
  return promiseInProgress === true ? <p>{PROGRESS}</p> :
    promiseInProgress === false ? <p>{IDLE}</p> : <p>{UNKNOWN}</p>;
};
const createFakePromise = (duration = 1000) => new Promise(
  resolve => setTimeout(() => resolve()),
  duration
);

/**
 * Test suites
 */
describe("trackerHook", () => {
  describe.skip("Initial Status", () => {
    it("renders without crashing", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      trackPromiseAPI.getProgressCount = jest.fn().mockImplementation(() => 0);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(trackPromiseAPI.getProgressCount).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different group", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      trackPromiseAPI.getProgressCount = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const group = "othergroup";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, group));

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(trackPromiseAPI.getProgressCount).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different group", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      trackPromiseAPI.getProgressCount = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const group = "othergroup";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, group));

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(trackPromiseAPI.getProgressCount).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render <h2>No Spinner</h2> when counter is 0", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return (
          <div>
            {promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      trackPromiseAPI.getProgressCount = jest.fn().mockImplementation(() => 0);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(component.find("h2")).toHaveLength(1);
      expect(trackPromiseAPI.getProgressCount).toHaveBeenCalled();
    });

    it("should render <h1>Spinner</h1> when counter is 1", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return (
          <div>
            {promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      trackPromiseAPI.getProgressCount = jest.fn().mockImplementation(() => 1);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(component.find("h1")).toHaveLength(1);
      expect(trackPromiseAPI.getProgressCount).toHaveBeenCalled();
    });

    it('should render component with trackedPromiseInProgress equals false and group equals "testgroup" when feeding group equals "testgroup" and delay equals 300', () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker({
          group: "testgroup",
          delay: 300
        });

        return <span>test</span>;
      };

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(component).toMatchSnapshot();
    });
  });

  describe("Testing delay timing", () => {

    it("[1] should change from IDLE to PROGRESS once the delay has ended, and from PROGRESS to IDLE once promise is fulfilled", done => {
      // Arrange
      const fakePromise = createFakePromise(600);

      // Act & Assert

      // 1. Mount component. Expect IDLE status.
      const component = mount(<TrackingComponent delay={150}/>);
      expect(component.text()).toEqual(IDLE);

      // 2. Track promise. Expect IDLE status, still under delay window.
      jest.advanceTimersByTime(50);
      expect(trackPromiseAPI.getProgressCount()).toEqual(0);
      trackPromiseAPI.trackPromise(fakePromise);
      expect(trackPromiseAPI.getProgressCount()).toEqual(1);
      jest.advanceTimersByTime(50);
      expect(component.text()).toEqual(IDLE);

      // 3. Complete delay window. Expect PROGRESS status.
      jest.advanceTimersByTime(300);
      expect(component.text()).toEqual(PROGRESS);

      // 4. Settled promise. Expect IDLE status.
      fakePromise.then(() => {
        expect(component.text()).toEqual(IDLE);
        done();
      });
    });

    it("[2] should stay IDLE when a promise is already in progress before component mounts and a delay is set", done => {
      // Arrange
      const fakePromise = createFakePromise(300);

      // Act & Assert

      // First: track promise. Check count increases by one.
      expect(trackPromiseAPI.getProgressCount()).toEqual(0);
      trackPromiseAPI.trackPromise(fakePromise);
      expect(trackPromiseAPI.getProgressCount()).toEqual(1);

      // Then, mount component with the promise already in progress.
      // Check delay is working and not showing PROGRESS yet.
      jest.advanceTimersByTime(50);
      const component = mount(<TrackingComponent delay={150}/>);
      jest.advanceTimersByTime(50);
      expect(component.text()).toEqual(IDLE);

      done();
    });
  });
});
