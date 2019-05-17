import { DEFAULT_GROUP } from "./constants";
import { setupConfig } from "./setupConfig";

describe("setupConfig", () => {
  it("should return same config as param if all values are informed", () => {
    // Arrange
    const userConfig = {group: 'mygroup', delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(200);
  });

  it("should return default config (default are, 0 delay) if input param is undefined", () => {
    // Arrange
    const userConfig = void(0);
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(0);
  });

  it("should return default config (default group, 0 delay) if input para is null", () => {
    // Arrange
    const userConfig = null;
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(0);
  });

  it("should fullfill default config and group if input param informed but empty object {}", () => {
    // Arrange
    const userConfig = null;
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(0);
  });


  it("should fullfill default group param if undefined but delay informed", () => {
    // Arrange
    const userConfig = {group: void(0), delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(200);
  });

  it("should fullfill default group param if null but delay informed", () => {
    // Arrange
    const userConfig = {group: null, delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe(DEFAULT_GROUP);
    expect(result.delay).toBe(200);
  });

  it("should fullfill delay param (0) if undefined but group informed", () => {
    // Arrange
    const userConfig = {group: 'mygroup', delay: void(0)};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(0);
  });

  it("should fullfill delay param (0) if null but group informed", () => {
    // Arrange
    const userConfig = {group: 'mygroup', delay: null};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.group).toBe('mygroup');
    expect(result.delay).toBe(0);
  });

});
