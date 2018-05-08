import React, { Component, PropTypes } from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackPromise';

export const promiseTrackerHoc = (ComponentToWrap, areas = ['global']) => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        trackedPromiseInProgress: false,
        areasHoc: areas,
      };
    }

    componentWillMount() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
        this.state.areasHoc.includes(area) ?
          this.setState({
            trackedPromiseInProgress: anyPromiseInProgress,
          }) :
          this.setState({
            trackedPromiseInProgress: false,
          })
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
        areasHoc={this.state.areasHoc} />
      )
    }
  }
}
