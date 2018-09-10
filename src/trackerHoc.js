import React, { Component } from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';
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

    componentDidMount() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
        if (this.state.area === area) {
          this.setState({ trackedPromiseInProgress: anyPromiseInProgress });
        }
      });
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
