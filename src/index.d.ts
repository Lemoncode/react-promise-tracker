// Type definitions for react-promise-tracker
// Project: https://github.com/Lemoncode/react-promise-tracker
// Definitions by: Lemoncode <https://github.com/lemoncode>

import * as React from "react";

/**
 * It tracks a promise while in pending state.
 * @param promise Input promise to be tracked.
 * @param group Organize promises into groups.
 * @returns It returns the same promise as input.
 */
export function trackPromise<T>(promise: Promise<T>, group?: string): Promise<T>;

/**
 * Configuration contract: user can setup groups (organize and track promises together) or delay when
 * the spinner is shown (this is useful when a user has a fast connection, to avoid unneccessary flickering)
 */
interface PromiseTrackerConfiguration {
   group?: string;
   delay?: number;
}

/**
 * It wraps a given React component into a new component that adds properties to watch
 * pending promises (HOC).
 * @param component Input component to be wrapped.
 * @returns It returns a new component that extends the input one.
 */
export interface ComponentToWrapProps {
  config: PromiseTrackerConfiguration;
  promiseInProgress: boolean;
}

export interface TrackerHocProps {
  config?: PromiseTrackerConfiguration;
}

export function promiseTrackerHoc<P>(component: React.ComponentType<P & ComponentToWrapProps>): React.ComponentType<P & TrackerHocProps>;

/**
 * React Promise Tracker custom hook.
 * Keep track of your promises in any component with this hook.
 *
 * @param configuration Optional. Object with a group property (string) and a delay property (number)
 * @returns An object with a progress boolean flag.
 */
export function usePromiseTracker(configuration?: PromiseTrackerConfiguration): { progress : boolean };
