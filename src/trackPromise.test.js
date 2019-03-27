import { trackPromise, emitter } from "./trackPromise";
import { defaultArea } from "./constants";

describe("trackPromise", () => {
  describe("using default area", () => {
    it("On Initial case, promise fired, promise emitter.emit is called", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);

      expect(emitter.emit).toHaveBeenCalledWith(
        "promise-counter-update",
        true,
        defaultArea
      );
    });

    it("Promise tracked, we got resolve, check that emit is called 2 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);

      // Assert
      myPromise.then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(2);

        expect(emitter.emit).toHaveBeenNthCalledWith(
          1,
          "promise-counter-update",
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Promise tracked, we got fail, check that emit is called 2 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.reject();

      // Act
      trackPromise(myPromise);

      // Assert
      myPromise.catch(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(2);

        expect(emitter.emit).toHaveBeenNthCalledWith(
          1,
          "promise-counter-update",
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    // Pending promise failed
    it("Two Promises tracked, we got resolve on both, check that emit is called 4 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      trackPromise(myPromiseB);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(4);

        expect(emitter.emit).toHaveBeenNthCalledWith(
          1,
          "promise-counter-update",
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          "promise-counter-update",
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          4,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    // Promise chaining working properly.
    it("Promise returned must handle transparently the result when resolved", done => {
      // Arrange
      const expectedPromiseResult = "promise result";
      const promise = Promise.resolve(expectedPromiseResult);

      // Act
      const trackedPromise = trackPromise(promise);

      // Assert
      trackedPromise.then(trackedPromiseResult => {
        expect(trackedPromiseResult).toEqual(expectedPromiseResult);
        done();
      });
    });
  });

  describe("using custom area", () => {
    it("should call emitter.emit one time when feeding promise and area equals undefined", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = undefined;

      // Act
      trackPromise(myPromise, area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        "promise-counter-update",
        true,
        defaultArea
      );
    });

    it("should call emitter.emit one time when feeding promise and area equals null", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = null;

      // Act
      trackPromise(myPromise, area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        "promise-counter-update",
        true,
        defaultArea
      );
    });

    it("should call emitter.emit one time when feeding promise and area equals testArea", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = "testArea";

      // Act
      trackPromise(myPromise, area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        "promise-counter-update",
        true,
        "testArea"
      );
    });

    it("should call emitter.emit two times when feeding two promises in same area", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const area = "testArea";

      // Act
      trackPromise(myPromise1, area);
      trackPromise(myPromise2, area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(2);
      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        "promise-counter-update",
        true,
        "testArea"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        2,
        "promise-counter-update",
        true,
        "testArea"
      );
    });

    it("should call emitter.emit two times when feeding two promises in different areas", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const area1 = "testArea1";
      const area2 = "testArea2";

      // Act
      trackPromise(myPromise1, area1);
      trackPromise(myPromise2, area2);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(2);
      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        "promise-counter-update",
        true,
        "testArea1"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        2,
        "promise-counter-update",
        true,
        "testArea2"
      );
    });
  });
});
