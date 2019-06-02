import { DEFAULT_GROUP, DEFAULT_DELAY } from './constants';
import { makeSafeConfig, event } from './utils';

describe('makeSafeConfig', () => {
  it('should return same config as input if all values are informed', () => {
    // Arrange
    const config = { group: 'mygroup', delay: 200 };
    // Act
    const result = makeSafeConfig(config);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(200);
  });

  it('should return default config if input config is undefined', () => {
    // Arrange
    const config = undefined;
    // Act
    const result = makeSafeConfig(config);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(DEFAULT_DELAY);
  });

  it('should return default config if input config is null', () => {
    // Arrange
    const userConfig = null;
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(DEFAULT_DELAY);
  });

  it('should return default config if input config is empty object', () => {
    // Arrange
    const userConfig = {};
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(DEFAULT_DELAY);
  });

  it('should fullfill default group param if input group is not informed', () => {
    // Arrange
    const userConfig = { delay: 200 };
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(200);
  });

  it('should fullfill default group param if input group is null', () => {
    // Arrange
    const userConfig = { group: null, delay: 200 };
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(200);
  });

  it('should fullfill default delay param if input delay is not informed', () => {
    // Arrange
    const userConfig = { group: 'mygroup' };
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(DEFAULT_DELAY);
  });

  it('should fullfill default delay param if input delay is null', () => {
    // Arrange
    const userConfig = { group: 'mygroup', delay: null };
    // Act
    const result = makeSafeConfig(userConfig);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(DEFAULT_DELAY);
  });
});

describe('event', () => {
  it('should return a composed event name if eventyType and group are informed', () => {
    // Arrange
    const eventType = 'event';
    const group = 'group';
    // Act
    const result = event(eventType, group);

    // Assert
    expect(result).toBe('event|group');
  });

  it('should return an simple event name if eventyType is informed but group is not', () => {
    // Arrange
    const eventType = 'event';
    const group = undefined;
    // Act
    const result = event(eventType, group);

    // Assert
    expect(result).toBe('event');
  });

  it('should return undefined if none of the params are informed', () => {
    // Arrange
    const eventType = undefined;
    const group = undefined;
    // Act
    const result = event(eventType, group);

    // Assert
    expect(result).toBe(undefined);
  });
});
