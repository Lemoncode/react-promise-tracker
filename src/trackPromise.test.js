import { trackPromise, emitter } from "./trackPromise";
import { PROGRESS_UPDATE, DEFAULT_GROUP } from "./constants";

describe("trackPromise", () => {
  describe("using default group", () => {
    it("On Initial case, promise fired, promise emitter.emit is called", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);

      expect(emitter.emit).toHaveBeenCalledWith(
        PROGRESS_UPDATE,
        true,
        DEFAULT_GROUP
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
          PROGRESS_UPDATE,
          true,
          DEFAULT_GROUP
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          PROGRESS_UPDATE,
          false,
          DEFAULT_GROUP
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
          PROGRESS_UPDATE,
          true,
          DEFAULT_GROUP
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          PROGRESS_UPDATE,
          false,
          DEFAULT_GROUP
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
          PROGRESS_UPDATE,
          true,
          DEFAULT_GROUP
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          2,
          PROGRESS_UPDATE,
          true,
          DEFAULT_GROUP
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          PROGRESS_UPDATE,
          true,
          DEFAULT_GROUP
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          4,
          PROGRESS_UPDATE,
          false,
          DEFAULT_GROUP
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

  describe("using custom group", () => {
    it("should call emitter.emit one time when feeding promise and group equals undefined", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const group = undefined;

      // Act
      trackPromise(myPromise, group);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        PROGRESS_UPDATE,
        true,
        DEFAULT_GROUP
      );
    });

    it("should call emitter.emit one time when feeding promise and group equals null", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const group = null;

      // Act
      trackPromise(myPromise, group);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        PROGRESS_UPDATE,
        true,
        DEFAULT_GROUP
      );
    });

    it("should call emitter.emit one time when feeding promise and group equals testgroup", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const group = "testgroup";

      // Act
      trackPromise(myPromise, group);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);
      expect(emitter.emit).toHaveBeenCalledWith(
        PROGRESS_UPDATE,
        true,
        "testgroup"
      );
    });

    it("should call emitter.emit two times when feeding two promises in same group", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const group = "testgroup";

      // Act
      trackPromise(myPromise1, group);
      trackPromise(myPromise2, group);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(2);
      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        PROGRESS_UPDATE,
        true,
        "testgroup"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        2,
        PROGRESS_UPDATE,
        true,
        "testgroup"
      );
    });

    it("should call emitter.emit two times when feeding two promises in different groups", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const group1 = "testgroup1";
      const group2 = "testgroup2";

      // Act
      trackPromise(myPromise1, group1);
      trackPromise(myPromise2, group2);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(2);
      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        PROGRESS_UPDATE,
        true,
        "testgroup1"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        2,
        PROGRESS_UPDATE,
        true,
        "testgroup2"
      );
    });
  });
});
