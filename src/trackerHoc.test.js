import React, { Component, PropTypes } from 'react';
import { promiseTrackerHoc } from './trackerHoc'

describe('trackerHoc', () => {

  test('Property trackedPromiseInProgress is passed down and false', () => {
    const DummyComponent = (props) => <span>test</span>;

    const TrackedComponent = promiseTrackerHoc(DummyComponent);
    const wrapper = mount(<TrackedComponent/>);

    const dummyChild = wrapper.find('DummyComponent');

    expect(dummyChild).not.toBe(null);
    expect(dummyChild.prop('trackedPromiseInProgress')).toBe(false);
  });
});
