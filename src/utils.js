export const makeSafeConfig = (config) => ({
  group: (!config || !config.group) ? DEFAULT_GROUP : config.group,
  delay: (!config || !config.delay) ? 0 : config.delay,
})
