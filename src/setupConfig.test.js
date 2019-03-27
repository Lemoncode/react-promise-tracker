import { defaultArea } from "./constants";
import {setupConfig} from './setupConfig';

describe("setupConfig", () => {
  it("should return same config as param if all values are informed", () => {
    // Arrange
    const userConfig = {area: 'myarea', delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe('myarea');
    expect(result.delay).toBe(200);
  });

  it("should return default config (default are, 0 delay) if input param is undefined", () => {
    // Arrange
    const userConfig = void(0);
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe(defaultArea);
    expect(result.delay).toBe(0);
  });

  it("should return default config (default area, 0 delay) if input para is null", () => {
    // Arrange
    const userConfig = null;
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe(defaultArea);
    expect(result.delay).toBe(0);
  });

  it("should fullfill default config and area if input param informed but empty object {}", () => {
    // Arrange
    const userConfig = null;
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe(defaultArea);
    expect(result.delay).toBe(0);
  });


  it("should fullfill defaultArea param if undefined but delay informed", () => {
    // Arrange
    const userConfig = {area: void(0), delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe(defaultArea);
    expect(result.delay).toBe(200);
  });

  it("should fullfill defaultArea param if null but delay informed", () => {
    // Arrange
    const userConfig = {area: null, delay: 200};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe(defaultArea);
    expect(result.delay).toBe(200);
  });

  it("should fullfill delay param (0) if undefined but area informed", () => {
    // Arrange
    const userConfig = {area: 'myarea', delay: void(0)};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe('myarea');
    expect(result.delay).toBe(0);
  });

  it("should fullfill delay param (0) if null but area informed", () => {
    // Arrange
    const userConfig = {area: 'myarea', delay: null};
    // Act
    const result = setupConfig(userConfig);

    // Assert
    expect(result.area).toBe('myarea');
    expect(result.delay).toBe(0);
  });

});
