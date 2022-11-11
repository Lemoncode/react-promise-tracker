// Type definitions for react-promise-tracker
// Project: https://github.com/Lemoncode/react-promise-tracker
// Definitions by: Lemoncode <https://github.com/lemoncode>

import * as React from "react";

/**
 * It tracks a promise while in pending state.
 * @param promise Input promise to be tracked.
 * @returns It returns the same promise as input.
 */
export function trackPromise<T>(promise: Promise<T>, area?: string): Promise<T>;

/**
 * Perform a reset for the area counter (default-area by default).
 */
export function manuallyResetPromiseCounter(area?: string): void;

/**
 * Decrement the area counter (default-area by default).
 */
export function manuallyDecrementPromiseCounter(area?: string): void;

/**
 * Increment the area counter (default-area by default).
 */
export function manuallyIncrementPromiseCounter(area?: string): void;

/**
 * Configuration contract: user can setup areas (display more than one spinner) or delay when
 * the spinner is shown (this is useful when a user has a fast connection, to avoid unneccessary flickering)
 */

interface Config {
  area?: string;
  delay?: number;
}

/**
 * React Promise Tracker custom hook, this hook will expose a promiseInProgress boolean flag.
 *
 * @param configuration (optional can be null).
 * @returns promiseInProgressFlag.
 */
export function usePromiseTracker(
  outerConfig?: Config
): { promiseInProgress: boolean };
