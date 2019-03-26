import React from "react";
import { promiseTrackerHoc } from "./trackerHoc";
import * as trackPromiseAPI from "./trackPromise";
import { defaultArea } from "./constants";
import { act } from "react-dom/test-utils"; // ES6

describe("trackerHoc", () => {
  describe("Initial Status", () => {
    it('should render component with trackedPromiseInProgress equals false and area equals "default-area" when render promiseTrackerHoc without props', () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(component).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false, area equals "default-area" and customProp equals "test" when feeding customProp equals "test"', () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent customProp="test" />);

      expect(component).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea"', () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(
        <TrackedComponent config={{ area: "testArea" }} />
      );

      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 0 and emit event with progress equals true", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = true;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals false", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals false to different area", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = false;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea" and delay equals 300', () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(
        <TrackedComponent config={{ area: "testArea", delay: 300 }} />
      );

      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals false to different area and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = false;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it.only("should render component with trackedPromiseInProgress equals true when counter is 0 and emit event with progress equals true and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));
      const setTimeoutStub = jest
        .spyOn(window, "setTimeout")
        .mockImplementation(callback => callback());

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 0 and emit event with progress equals true to different area and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

      const progress = true;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = true;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals true to different area and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = true;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals false when counter is 1 and emit event with progress equals false and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = false;
      const area = defaultArea;
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
      expect(component).toMatchSnapshot();
    });

    it("should render component with trackedPromiseInProgress equals true when counter is 1 and emit event with progress equals false to different area and delay equals 300", () => {
      // Arrange
      const TestSpinnerComponent = props => <span>test</span>;
      trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

      const progress = false;
      const area = "otherArea";
      const emitterStub = jest
        .spyOn(trackPromiseAPI.emitter, "on")
        .mockImplementation((id, callback) => callback(progress, area));

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

      // Assert
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
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
      let TestSpinnerComponent = null;
      act(() => {
        TestSpinnerComponent = props => {
          return (
            <div>
              {props.promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
            </div>
          );
        };

        trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);
      });

      // Act
      let component = null;
      act(() => {
        const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);
        component = mount(<TrackedComponent config={{ delay: 300 }} />);
      });

      // Check very beginning (no promises going on) NO SPINNER is shown
      // TODO: this assert could be skipped (move to another test)
      expect(component.text()).toMatch("NO SPINNER");
      expect(trackPromiseAPI.getCounter).toHaveBeenCalled();

      // Assert
      // This promise will resolved after 1 seconds, by doing this
      // we will be able to test 2 scenarios:
      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      // [1] after 200ms spinner will be shown (text SPINNER)
      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)
      let myFakePromise = null;

      act(() => {
        myFakePromise = new Promise(resolve => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        });
      });

      act(() => {
        trackPromiseAPI.trackPromise(myFakePromise);

        // Runs all pending timers. whether it's a second from now or a year.
        // https://jestjs.io/docs/en/timer-mocks.html
        //jest.advanceTimersByTime(300);
      });

      act(() => {
        // Runs all pending timers. whether it's a second from now or a year.
        // https://jestjs.io/docs/en/timer-mocks.html
        jest.advanceTimersByTime(100);
      });

      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      expect(component.text()).toMatch("NO SPINNER");

      act(() => {
        // Runs all pending timers. whether it's a second from now or a year.
        // https://jestjs.io/docs/en/timer-mocks.html
        jest.advanceTimersByTime(300);
      });

      // Before the promise get's resolved
      // [1] after 200ms spinner will be shown (text SPINNER)
      expect(component.text()).toMatch("SPINNER");

      // After the promise get's resolved

      act(() => {
        jest.runAllTimers();
      });

      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)
      // Wait for fakePromise (simulated ajax call) to be completed
      // no spinner should be shown
      act(() => {
        myFakePromise.then(() => {
          expect(component.text()).toMatch("NO SPINNER");
        });
      });
    });
  });

});
