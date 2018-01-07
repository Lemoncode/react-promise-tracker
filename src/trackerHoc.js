import React, { Component } from "react";
import { emitter, promiseCounterUpdateEventId } from "./trackPromise";

export const promiseTrackerHoc = ComponentToWrap => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = { trackedPromiseInProgress: false };
    }

    componentWillMount() {
      emitter.on(promiseCounterUpdateEventId, anyPromiseInProgress => {
        this.setState({ trackedPromiseInProgress: anyPromiseInProgress });
      });
    }

    componentWillUnmount() {
      emitter.off(promiseCounterUpdateEventId);
    }

    render() {
      return (
        <ComponentToWrap
          {...this.props}
          trackedPromiseInProgress={this.state.trackedPromiseInProgress}
        />
      );
    }
  };
};
