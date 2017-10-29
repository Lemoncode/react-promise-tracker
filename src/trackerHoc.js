import React, { Component, PropTypes } from 'react'
import { emitter, promiseCounterUpdateEventId } from './trackHttp';

export const promiseTrackerHoc = (ComponentToWrap) => {
  return class promiseTrackerComponent extends Component {
    // let’s define what’s needed from the `context`
    constructor(props) {
      super(props);

      this.state = {trackedPromiseInProgress: false};
    }

    componentWillMount() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress) => {        
        this.setState({trackedPromiseInProgress: anyPromiseInProgress});
      });            
    }

    componentWillUnmount() {
      emitter.off(promiseCounterUpdateEventId);
    }

    render() {      
      return (
        <ComponentToWrap {...this.props} trackedPromiseInProgress={this.state.trackedPromiseInProgress} />
      )
    }
  }
}
