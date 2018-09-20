import React, { Component } from 'react'
import { emitter, getCounter, promiseCounterUpdateEventId } from './trackPromise';
import { defaultArea } from './constants';

export const promiseTrackerHoc = (ComponentToWrap) => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        trackedPromiseInProgress: false,
        area: props.area || defaultArea,
      };
    }

    updateProgress(progress, afterUpdateCallback) {
      this.setState({ trackedPromiseInProgress: progress }, afterUpdateCallback);
    }

    subscribeToCounterUpdate() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
        if (this.state.area === area) {
          this.updateProgress(anyPromiseInProgress);
        }
      });
    }

    componentDidMount() {
      this.updateProgress(
        Boolean(getCounter(this.state.area) > 0),
        this.subscribeToCounterUpdate
      );
    }

    componentWillUnmount() {
      emitter.off(promiseCounterUpdateEventId);
    }

    render() {
      return (
        <ComponentToWrap
          {...this.props}
          area={this.state.area}
          trackedPromiseInProgress={this.state.trackedPromiseInProgress}
        />
      )
    }
  }
}
