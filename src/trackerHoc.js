import React, { Component } from 'react'
import { emitter, getCounter, promiseCounterUpdateEventId } from './trackPromise';
import { defaultArea } from './constants';

// Props:
// config: {
//  area:  // can be null|undefined|'' (will default to DefaultArea) or area name
//  delay: // Wait Xms to display the spinner (fast connections scenario avoid blinking)
//            default value 0ms
// }
export const promiseTrackerHoc = (ComponentToWrap) => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        trackedPromiseInProgress: false,
        area: {
            area: (props.config && props.config.area) || defaultArea,
            delay:(props.config && props.config.delay) || 0,
        }
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
