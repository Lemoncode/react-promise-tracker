import React from 'react';
import { promiseTrackerHoc } from './trackerHoc';
import * as trackPromiseAPI from './trackPromise';

describe('trackerHoc', () => {
  it('should render component with trackedPromiseInProgress equals false and area equals "default-area" when render promiseTrackerHoc', () => {
    // Arrange
    const TestSpinnerComponent = (props) => <span>test</span>;

    // Act
    const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

    // Assert
    const component = mount(
      <TrackedComponent
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render component with trackedPromiseInProgress equals false, area equals "default-area" and customProp equals "test" when feeding customProp equals "test"', () => {
    // Arrange
    const TestSpinnerComponent = (props) => <span>test</span>;

    // Act
    const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

    // Assert
    const component = mount(
      <TrackedComponent
        customProp="test"
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render component with trackedPromiseInProgress equals false and area equals "testArea" when feeding area equals "testArea"', () => {
    // Arrange
    const TestSpinnerComponent = (props) => <span>test</span>;

    // Act
    const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

    // Assert
    const component = mount(
      <TrackedComponent
        area="testArea"
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render component with trackedPromiseInProgress equals false when counter is 0', () => {
    // Arrange
    const TestSpinnerComponent = (props) => <span>test</span>;
    trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 0);

    // Act
    const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

    // Assert
    const component = mount(
      <TrackedComponent
      />,
    );

    expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

  it('should render component with trackedPromiseInProgress equals true when counter is 1', () => {
    // Arrange
    const TestSpinnerComponent = (props) => <span>test</span>;
    trackPromiseAPI.getCounter = jest.fn().mockImplementation(() => 1);

    // Act
    const TrackedComponent = promiseTrackerHoc(TestSpinnerComponent);

    // Assert
    const component = mount(
      <TrackedComponent
      />,
    );

    expect(trackPromiseAPI.getCounter).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
