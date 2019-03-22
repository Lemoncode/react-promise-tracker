import React from "react";
import { promiseTrackerHoc } from "./trackerHoc";
import * as trackPromiseAPI from "./trackPromise";
import { defaultArea } from "./constants";

describe("trackerHoc", () => {
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
    const component = mount(<TrackedComponent config={{ area: "testArea" }} />);

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
      .mockImplementation((callback) => callback());

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
