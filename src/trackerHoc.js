import React, { Component } from 'react';
import {
  emitter,
  getProgressCount,
  promiseCounterUpdateEventId
} from './trackPromise';
import { setupConfig } from './setupConfig';

// Props:
// config: {
//  group:  // can be null|undefined|'' (will default to DefaultGroup) or group name
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
      emitter.on(promiseCounterUpdateEventId, (anyPromiseInProgress, group) => {
        if (this.state.config.group === group) {
          this.updateProgress(anyPromiseInProgress);
        }
      });
    }

    componentDidMount() {
      this.updateProgress(
        Boolean(getProgressCount(this.state.config.group) > 0),
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
