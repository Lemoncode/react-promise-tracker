/**
 * Type definitions for react-promise-tracker
 * Project: https://github.com/Lemoncode/react-promise-tracker
 * Definitions by: Lemoncode <https://github.com/lemoncode>
 */

import * as React from 'react';

/**
 * Promise tracking function. It tracks whether a promise is pending or settled.
 * @param promise Input promise to be tracked.
 * @param group Organize promises into groups. A group represents an alias under which
 * promises can be organized and tracked together.
 * @returns For convenience, it returns the same promise as input.
 */
export declare function trackPromise<T>(promise: Promise<T>, group?: string): Promise<T>;

/**
 * Tracking configuration interface.
 * - group: it represents an alias to organize and track promises together.
 * - delay: miliseconds to throttle tracking. This is useful under fast connections to
 * avoid unnecessary flickering.
 */
export interface TrackingConfig {
  group?: string;
  delay?: number;
}

/**
 * It wraps a given React component into a new component that adds properties to watch
 * pending promises (HOC).
 * @param component Input component to be wrapped.
 * @returns It returns a new component that extends the input one.
 */
export interface WithPromiseTracker {
  trackingConfig?: TrackingConfig;
  progress: boolean;
}

/**
 * React Promise Tracker HOC.
 * Wrap your component with this HOC and keep track or your promises.
 * @param Component Component to be wrapped.
 * @returns Wrapped component with trackingConfig available.
 */
export declare function withPromiseTracker<P extends WithPromiseTracker>(
  Component: React.ComponentType<P>
): React.ComponentType<Pick<P, Exclude<keyof P, 'progress'>>>;

/**
 * React Promise Tracker custom hook.
 * Apply this hook in any component and keep track of your promises.
 * @param configuration Optional. Object with a group property (string) and a delay property (number)
 * @returns An object with a progress boolean flag.
 */
export declare function usePromiseTracker(trackingConfig?: TrackingConfig): { progress: boolean };
