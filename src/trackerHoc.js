import React, { Component, PropTypes } from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';

export const promiseTrackerHoc = (ComponentToWrap, areas = 'global') => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        trackedPromiseInProgress: false,
        areaSubscribed: areas,
      };
    }

    componentWillMount() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
        if(this.state.areaSubscribed === area) {
          this.setState({
            trackedPromiseInProgress: anyPromiseInProgress,
          });
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
        trackedPromiseInProgress={this.state.trackedPromiseInProgress}
        areaSubscribed={this.state.areaSubscribed} />
      )
    }
  }
}
