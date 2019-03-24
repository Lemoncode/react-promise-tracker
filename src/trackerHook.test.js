import React from "react";
import { usePromiseTracker } from "./trackerHook";
import * as trackPromiseAPI from "./trackPromise";
import { defaultArea } from "./constants";
import { trackPromise, emitter } from "./trackPromise";
import { act } from "react-dom/test-utils"; // ES6

describe("trackerHoc", () => {
  describe("Initial Status", () => {
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

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return <span>test</span>;
      };

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
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

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(component.find("h2")).toHaveLength(1);
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
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

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert

      expect(component.find("h1")).toHaveLength(1);
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
    });

    it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea" and delay equals 300', () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker({
          area: "testArea",
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

  describe("Handling delay timeouts", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it.only("should render <h1>NO SPINNER</h2> when counter is 1 but delay is set to 200 (before timing out)", () => {
      // Arrange

      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker({ delay: 200 });

        return (
          <div>
            {promiseInProgress ?
              <h1>SPINNER</h1> :
              <h2>NO SPINNER</h2>
            }
          </div>
        );
      };

      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      // Act
      let component = null;

      act(() => {
        component = mount(<TestSpinnerComponent />);
      });

      expect(component.find("h2")).toHaveLength(1);
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();

      // Assert
      let myFakePromise = null;
      act(() => {
        myFakePromise = new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 1000);

        });
        trackPromiseAPI.trackPromise(myFakePromise);

        // Runs all pending timers. whether it's a second from now or a year.
        // https://jestjs.io/docs/en/timer-mocks.html
        jest.advanceTimersByTime(300);
      });

      // Before the promise get's resolved
      expect(component.text()).toMatch('SPINNER');
      // After the promise get's resolved
      act(() => {
        jest.runAllTimers();
        jest.clearAllTimers();
      });

      // Wait for fakePromise (simulated ajax call) to be completed
      // no spinner should be shown
      myFakePromise.then(() => {
        expect(component.text()).toMatch('NO SPINNER');
      })

    });
  });
});
