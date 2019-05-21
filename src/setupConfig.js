// TODO:  This file is candidate to be removed.

import { DEFAULT_GROUP } from "./constants";

export const defaultConfig = { group: DEFAULT_GROUP, delay: 0 };

// Defensive config setup, fulfill default values
export const setupConfig = (outerConfig) => ({
  group: (!outerConfig || !outerConfig.group) ? DEFAULT_GROUP : outerConfig.group,
  delay: (!outerConfig || !outerConfig.delay) ? 0 : outerConfig.delay,
})
