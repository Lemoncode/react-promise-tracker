import React, { Component } from 'react';
import {
  emitter,
  getCounter,
  promiseCounterUpdateEventId
} from './trackPromise';
import { setupConfig } from './setupConfig';

// Props:
// config: {
//  area:  // can be null|undefined|'' (will default to DefaultArea) or area name
//  delay: // Wait Xms to display the spinner (fast connections scenario avoid blinking)
//            default value 0ms
// }
export const promiseTrackerHoc = ComponentToWrap => {
  return class promiseTrackerComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        promiseInProgress: false,
        internalPromiseInProgress: false,
        config: setupConfig(props.config)
      };

      this.notifyPromiseInProgress = this.notifyPromiseInProgress.bind(this);
      this.updateProgress = this.updateProgress.bind(this);
      this.subscribeToCounterUpdate = this.subscribeToCounterUpdate.bind(this);
    }

    notifyPromiseInProgress() {
      this.state.config.delay === 0
        ? this.setState({ promiseInProgress: true })
        : setTimeout(() => {
            this.setState({ promiseInProgress: true });
          }, this.state.config.delay);
    }

    updateProgress(progress, afterUpdateCallback) {
      this.setState(
        { internalPromiseInProgress: progress },
        afterUpdateCallback
      );

      !progress
        ? this.setState({ promiseInProgress: false })
        : this.notifyPromiseInProgress();
    }

    subscribeToCounterUpdate() {
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, area) => {
        if (this.state.config.area === area) {
          this.updateProgress(anyPromiseInProgress);
        }
      });
    }

    componentDidMount() {
      this.updateProgress(
        Boolean(getCounter(this.state.config.area) > 0),
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
          config={this.state.config}
          promiseInProgress={this.state.promiseInProgress}
        />
      );
    }
  };
};
