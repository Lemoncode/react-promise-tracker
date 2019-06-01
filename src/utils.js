/**
 * Given an unsafe config, return a safe config object initialized
 * with default values whenever it applies.
 */
export const makeSafeConfig = (config) => ({
  group: (!config || !config.group) ? DEFAULT_GROUP : config.group,
  delay: (!config || !config.delay) ? DEFAULT_DELAY : config.delay,
})

/**
 * Creates an emitter event name based on the event type and the
 * target group.
 */
export const event = (eventType, group) => `${eventType}|${group}`;
