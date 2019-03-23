import React from "react";
import { usePromiseTracker } from "./trackerHook";
import * as trackPromiseAPI from "./trackPromise";
import { defaultArea } from "./constants";import { trackPromise, emitter } from "./trackPromise";

describe("trackerHoc", () => {
  it("renders without crashing", () => {
      // Arrange
      const TestSpinnerComponent = props => {
        const { promiseInProgress } = usePromiseTracker();

        return (
          <span>test</span>
        )
      }

      // Act
      const component = mount(<TestSpinnerComponent />);

      // Assert
      expect(component).toMatchSnapshot();

  });

  it("should render component with trackedPromiseInProgress equals false when counter is 0", () => {
    // Arrange
    const TestSpinnerComponent = props => {
      const { promiseInProgress } = usePromiseTracker();

      return (
        <span>test</span>
      )
    }

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

      return (
        <span>test</span>
      )
    }

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

      return (
        <span>test</span>
      )
    }


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

  it("should render component with trackedPromiseInProgress equals true when counter is 0", () => {
    // Arrange
    const TestSpinnerComponent = props => {
      const { promiseInProgress } = usePromiseTracker();

      return (
        <div>
        {
          promiseInProgress
          ? <h1>SPINNER</h1>
          : <h2>NO SPINNER</h2>
        }
        </div>
      )
    }

    trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

    // Act
    const component = mount(<TestSpinnerComponent />);

    // Assert

    expect(component.find('h2')).toHaveLength(1);
    expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
  });


  it("should render component with trackedPromiseInProgress equals true when counter is 1", () => {
    // Arrange
    const TestSpinnerComponent = props => {
      const { promiseInProgress } = usePromiseTracker();

      return (
        <div>
        {
          promiseInProgress
          ? <h1>SPINNER</h1>
          : <h2>NO SPINNER</h2>
        }
        </div>
      )
    }

    trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

    // Act
    const component = mount(<TestSpinnerComponent />);

    // Assert

    expect(component.find('h1')).toHaveLength(1);
    expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
  });

  it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea" and delay equals 300', () => {
    // Arrange
    const TestSpinnerComponent = props => {
      const { promiseInProgress } = usePromiseTracker({ area: "testArea", delay: 300 });

      return (
        <span>test</span>
      )
    }

    // Act
    const component = mount(<TestSpinnerComponent />);

    // Assert

    expect(component).toMatchSnapshot();
  });

});
