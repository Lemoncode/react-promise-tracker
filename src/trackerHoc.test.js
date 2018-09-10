import React from 'react';
import { promiseTrackerHoc } from './trackerHoc'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';

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
});
