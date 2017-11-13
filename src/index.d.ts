// Type definitions for react-promise-tracker
// Project: https://github.com/Lemoncode/react-promise-tracker
// Definitions by: Lemoncode <https://github.com/lemoncode>

import * as React from "react";

/**
 * It tracks a promise while in pending state.
 * @param promise Input promise to be tracked.
 * @returns It returns the same promise as input.
 */
export function trackPromise(promise: Promise <any> ): Promise <any>;


/**
 * It wraps a given React component into a new component that adds properties to watch
 * pending promises.
 * @param component Input component to be wrapped.
 * @returns It returns a new component that extends the input one.
 */
export function promiseTrackerHoc(component: React.Component <any, any> ): React.Component <any, any>;