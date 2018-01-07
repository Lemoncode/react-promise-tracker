import { trackPromise, emitter } from "./trackPromise";

describe("trackPromise", () => {
  test("On Initial case, promise fired, promise emitter.emit is called", () => {
    // Arrange
    emitter.emit = jest.fn(() => {
      return;
    });

    const myPromise = Promise.resolve().then(() => {
      return "ok";
    });

    // Act
    trackPromise(myPromise);

    // Assert
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    return myPromise;
  });

  test("Promise tracked, we got resolve, check that emit is called 2 times", () => {
    // Arrange
    emitter.emit = jest.fn(() => {
      return;
    });

    const myPromise = Promise.resolve();

    // Act
    trackPromise(myPromise);

    // Assert
    return myPromise.then(() => {
      expect(emitter.emit).toHaveBeenCalledTimes(2);
    });
  });

  test.skip("Promise tracked, we got fail, check that emit is called 2 times", () => {
    // Arrange
    expect.assertions(1);

    emitter.emit = jest.fn(() => {
      return;
    });

    const myPromise = Promise.reject();

    // Act
    trackPromise(myPromise);

    // Assert
    return myPromise.catch(() => {
      expect(emitter.emit).toHaveBeenCalledTimes(2);
    });
  });

  // Pending promise failed
  test("Two Promises tracked, we got resolve on both, check that emit is called 4 times", () => {
    // Arrange
    expect.assertions(1);

    emitter.emit = jest.fn(() => {
      return;
    });

    const myPromiseA = Promise.resolve();
    const myPromiseB = Promise.resolve();
    const promises = [myPromiseA, myPromiseB];

    // Act
    trackPromise(myPromiseA);
    trackPromise(myPromiseB);

    // Assert
    return Promise.all(promises).then(() => {
      expect(emitter.emit).toHaveBeenCalledTimes(4);
    });
  });
});
