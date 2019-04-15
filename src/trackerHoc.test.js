import React from "react";
import { promiseTrackerHoc } from "./trackerHoc";
import * as trackPromiseAPI from "./trackPromise";
import { defaultArea } from "./constants";

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

    it("should render component with trackedPromiseInProgress equals true when counter is 0 and emit event with progress equals true and delay equals 300", () => {
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

    it("should render <h1>NO SPINNER</h2> when counter is 1 but delay is set to 300 (before timing out)", done => {
      // Arrange
      const TestSpinnerComponent = props => {
        return (
          <div>
            {props.promiseInProgress ? <h1>SPINNER</h1> : <h2>NO SPINNER</h2>}
          </div>
        );
      };

      const getCounterStub = jest
        .spyOn(trackPromiseAPI, "getCounter")
        .mockReturnValue(0);

      // Act
      const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);
      const component = mount(<TrackedComponent config={{ delay: 300 }} />);

      // Check very beginning (no promises going on) NO SPINNER is shown
      // TODO: this assert could be skipped (move to another test)
      expect(component.text()).toEqual("NO SPINNER");
      expect(getCounterStub).toHaveBeenCalled();

      // Assert
      // This promise will resolved after 1 seconds, by doing this
      // we will be able to test 2 scenarios:
      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      // [1] after 200ms spinner will be shown (text SPINNER)
      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)

      const myFakePromise = new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      trackPromiseAPI.trackPromise(myFakePromise);

      jest.advanceTimersByTime(100);

      // [0] first 200ms spinner won't be shown (text NOSPINNER)
      expect(component.text()).toEqual("NO SPINNER");

      jest.advanceTimersByTime(300);

      // Before the promise get's resolved
      // [1] after 200ms spinner will be shown (text SPINNER)
      expect(component.text()).toEqual("SPINNER");

      // After the promise get's resolved
      jest.runAllTimers();

      // [2] after 1000ms spinner will be hidded again (text NOSPINNER)
      // Wait for fakePromise (simulated ajax call) to be completed
      // no spinner should be shown

      myFakePromise.then(() => {
        expect(component.text()).toEqual("NO SPINNER");
        done();
      });
    });
  });
});
