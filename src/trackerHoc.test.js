import React from "react";
import { promiseTrackerHoc } from "./trackerHoc";

/* global mount */

describe("trackerHoc", () => {
  test("Property trackedPromiseInProgress is passed down and value false", () => {
    const DummyComponent = () => <span>test</span>;

    const TrackedComponent = promiseTrackerHoc(DummyComponent);
    const wrapper = mount(<TrackedComponent />);

    const dummyChild = wrapper.find("DummyComponent");

    expect(dummyChild).not.toBe(null);
    expect(dummyChild.prop("trackedPromiseInProgress")).toBe(false);
  });

  test("Additional properties are passed down to the child component", () => {
    const DummyComponent = () => <span>test</span>;

    const TrackedComponent = promiseTrackerHoc(DummyComponent);
    const wrapper = mount(<TrackedComponent customprop="test" />);

    const dummyChild = wrapper.find("DummyComponent");

    expect(dummyChild).not.toBe(null);
    expect(dummyChild.prop("customprop")).toBe("test");
  });
});
