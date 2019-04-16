import { defaultArea } from "./constants";

export const defaultConfig = { area: defaultArea, delay: 0 };

// Defensive config setup, fulfill default values
export const setupConfig = (outerConfig) => ({
  area: (!outerConfig || !outerConfig.area) ? defaultArea : outerConfig.area,
  delay: (!outerConfig || !outerConfig.delay) ? 0 : outerConfig.delay,
})
