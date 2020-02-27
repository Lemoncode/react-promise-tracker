import {
  trackPromise,
  emitter,
  getCounter,
  manuallyResetPromiseCounter,
  manuallyDecrementPromiseCounter,
  manuallyIncrementPromiseCounter
} from "./trackPromise";
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

describe("manuallyResetPromiseCounter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("using default area", () => {
    it("On Initial case, manuallyResetPromiseCounter fired, promise emitter.emit is called", () => {
      // Arrange
      emitter.emit = jest.fn();

      // Act
      manuallyResetPromiseCounter();

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);

      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        "promise-counter-update",
        false,
        defaultArea
      );

      expect(getCounter(defaultArea)).toBe(0);
    });

    it("Promise tracked and manuallyResetPromiseCounter fired, we got resolve, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);
      expect(getCounter(defaultArea)).toBe(1);
      manuallyResetPromiseCounter();

      // Assert
      myPromise.then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Promise tracked and manuallyResetPromiseCounter fired, we got fail, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.reject();

      // Act
      trackPromise(myPromise);

      expect(getCounter(defaultArea)).toBe(1);
      manuallyResetPromiseCounter();
      expect(getCounter(defaultArea)).toBe(0);

      // Assert

      myPromise.catch(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Two Promises tracked and manuallyResetPromiseCounter fired after to start the first promise, we got resolve on both, check that emit is called 5 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      expect(getCounter(defaultArea)).toBe(1);

      manuallyResetPromiseCounter();
      expect(getCounter(defaultArea)).toBe(0);

      trackPromise(myPromiseB);
      expect(getCounter(defaultArea)).toBe(1);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Promise returned must handle transparently the result when resolved and manuallyResetPromiseCounter fired", done => {
      // Arrange
      const expectedPromiseResult = "promise result";
      const promise = Promise.resolve(expectedPromiseResult);

      // Act
      const trackedPromise = trackPromise(promise);
      manuallyResetPromiseCounter();

      // Assert
      trackedPromise.then(trackedPromiseResult => {
        expect(trackedPromiseResult).toEqual(expectedPromiseResult);
        done();
      });
    });
  });

  describe("using custom area", () => {
    it("should call emitter.emit two time when feeding promise and area equals undefined and manuallyResetPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = undefined;

      // Act
      trackPromise(myPromise, area);
      manuallyResetPromiseCounter(area);

      // Assert
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
    });

    it("should call emitter.emit two time when feeding promise and area equals null and manuallyResetPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = null;

      // Act
      trackPromise(myPromise, area);
      manuallyResetPromiseCounter(area);

      // Assert
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
    });

    it("should call emitter.emit two time when feeding promise and area equals testArea and manuallyResetPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = "testArea";

      // Act
      trackPromise(myPromise, area);
      manuallyResetPromiseCounter(area);

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
        false,
        "testArea"
      );
    });

    it("should call emitter.emit three times when feeding two promises in same area and manuallyResetPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const area = "testArea";

      // Act
      trackPromise(myPromise1, area);
      trackPromise(myPromise2, area);
      manuallyResetPromiseCounter(area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(3);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        false,
        "testArea"
      );
    });

    it("should call emitter.emit three times when feeding two promises in different areas and manuallyResetPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const area1 = "testArea1";
      const area2 = "testArea2";

      // Act
      trackPromise(myPromise1, area1);
      trackPromise(myPromise2, area2);
      manuallyResetPromiseCounter(area1);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(3);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        false,
        "testArea1"
      );
      expect(getCounter("testArea1")).toBe(0);
      expect(getCounter("testArea2")).toBe(1);
    });

    it("when call manuallyResetPromiseCounter, the counter must be zero", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myFakePromise1 = new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });

      const myFakePromise2 = new Promise(resolve => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      const promises = [myFakePromise1, myFakePromise2];

      const area = "testArea";

      // Act
      trackPromise(myFakePromise1, area);
      trackPromise(myFakePromise2, defaultArea);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(2);
      expect(getCounter("default-area")).toBe(1);
      expect(getCounter("testArea")).toBe(1);

      jest.advanceTimersByTime(500);
      manuallyResetPromiseCounter();

      expect(emitter.emit).toHaveBeenCalledTimes(3);

      expect(getCounter("default-area")).toBe(0);
      expect(getCounter("testArea")).toBe(1);

      jest.advanceTimersByTime(1500);

      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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
          "default-area"
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          false,
          "default-area"
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          4,
          "promise-counter-update",
          false,
          "testArea"
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          false,
          "default-area"
        );

        expect(getCounter("default-area")).toBe(0);
        expect(getCounter("testArea")).toBe(0);

        // After the promise get's resolved
        jest.runAllTimers();
        done();
      });
    });
  });
});

describe("manuallyDecrementPromiseCounter", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe("using default area", () => {
    it("On Initial case, manuallyDecrementPromiseCounter fired, promise emitter.emit is called", () => {
      // Arrange
      emitter.emit = jest.fn();

      // Act
      manuallyDecrementPromiseCounter();

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);

      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        "promise-counter-update",
        false,
        defaultArea
      );

      expect(getCounter(defaultArea)).toBe(0);
    });

    it("Promise tracked and manuallyDecrementPromiseCounter fired, we got resolve, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);
      expect(getCounter(defaultArea)).toBe(1);
      manuallyDecrementPromiseCounter();

      // Assert
      myPromise.then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Promise tracked and manuallyDecrementPromiseCounter fired, we got fail, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.reject();

      // Act
      trackPromise(myPromise);

      expect(getCounter(defaultArea)).toBe(1);
      manuallyDecrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(0);

      // Assert

      myPromise.catch(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          3,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Two Promises tracked and manuallyDecrementPromiseCounter fired after to start the first promise, we got resolve on both, check that emit is called 5 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      expect(getCounter(defaultArea)).toBe(1);

      manuallyDecrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(0);

      trackPromise(myPromiseB);
      expect(getCounter(defaultArea)).toBe(1);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Two Promises tracked and manuallyDecrementPromiseCounter fired after to start the second promise, we got resolve on both, check that emit is called 5 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      trackPromise(myPromiseB);
      expect(getCounter(defaultArea)).toBe(2);

      manuallyDecrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(1);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          false,
          defaultArea
        );
        done();
      });
    });

    it("Promise returned must handle transparently the result when resolved and manuallyDecrementPromiseCounter fired", done => {
      // Arrange
      const expectedPromiseResult = "promise result";
      const promise = Promise.resolve(expectedPromiseResult);

      // Act
      const trackedPromise = trackPromise(promise);
      manuallyDecrementPromiseCounter();

      // Assert
      trackedPromise.then(trackedPromiseResult => {
        expect(trackedPromiseResult).toEqual(expectedPromiseResult);
        done();
      });
    });
  });

  describe("using custom area", () => {
    it("should call emitter.emit two time when feeding promise and area equals undefined and manuallyDecrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = undefined;

      // Act
      trackPromise(myPromise, area);
      manuallyDecrementPromiseCounter(area);

      // Assert
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
    });

    it("should call emitter.emit two time when feeding promise and area equals null and manuallyDecrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = null;

      // Act
      trackPromise(myPromise, area);
      manuallyDecrementPromiseCounter(area);

      // Assert
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
    });

    it("should call emitter.emit two time when feeding promise and area equals testArea and manuallyDecrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = "testArea";

      // Act
      trackPromise(myPromise, area);
      manuallyDecrementPromiseCounter(area);

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
        false,
        "testArea"
      );
    });

    it("should call emitter.emit three times when feeding two promises in same area and manuallyDecrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      const area = "testArea";

      // Act
      trackPromise(myPromise1, area);
      trackPromise(myPromise2, area);
      manuallyDecrementPromiseCounter(area);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(3);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        true,
        "testArea"
      );
    });

    it("should call emitter.emit three times when feeding three promises in different areas and manuallyDecrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();
      const myPromise3 = Promise.resolve();

      const area1 = "testArea1";
      const area2 = "testArea2";

      // Act
      trackPromise(myPromise1, area1);
      trackPromise(myPromise2, area2);
      trackPromise(myPromise3, area2);
      expect(getCounter("testArea2")).toBe(2);
      manuallyDecrementPromiseCounter(area2);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(4);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        true,
        "testArea2"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        4,
        "promise-counter-update",
        true,
        "testArea2"
      );
      expect(getCounter("testArea1")).toBe(1);
      expect(getCounter("testArea2")).toBe(1);
    });
  });
});

describe("manuallyIncrementPromiseCounter", () => {
  describe("using default area", () => {
    beforeEach(() => {
      manuallyResetPromiseCounter();
    });

    it("On Initial case, manuallyIncrementPromiseCounter fired, promise emitter.emit is called", () => {
      // Arrange
      emitter.emit = jest.fn();

      // Act
      manuallyIncrementPromiseCounter();

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(1);

      expect(emitter.emit).toHaveBeenNthCalledWith(
        1,
        "promise-counter-update",
        true,
        defaultArea
      );
    });

    it("Promise tracked and manuallyIncrementPromiseCounter fired, we got resolve, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise);
      manuallyIncrementPromiseCounter();

      // Assert
      myPromise.then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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

        expect(getCounter(defaultArea)).toBe(1);
        done();
      });
    });

    it("Promise tracked and manuallyIncrementPromiseCounter fired, we got fail, check that emit is called 3 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.reject();

      // Act
      trackPromise(myPromise);

      expect(getCounter(defaultArea)).toBe(1);
      manuallyIncrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(2);

      // Assert

      myPromise.catch(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(3);

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
        expect(getCounter(defaultArea)).toBe(1);
        done();
      });
    });

    it("Two Promises tracked and manuallyIncrementPromiseCounter fired after to start the first promise, we got resolve on both, check that emit is called 5 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      expect(getCounter(defaultArea)).toBe(1);

      manuallyIncrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(2);

      trackPromise(myPromiseB);
      expect(getCounter(defaultArea)).toBe(3);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          true,
          defaultArea
        );
        expect(getCounter(defaultArea)).toBe(1);
        done();
      });
    });

    it("Two Promises tracked and manuallyIncrementPromiseCounter fired after to start the second promise, we got resolve on both, check that emit is called 5 times", done => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromiseA = Promise.resolve();
      const myPromiseB = Promise.resolve();
      const promises = [myPromiseA, myPromiseB];

      // Act
      trackPromise(myPromiseA);
      trackPromise(myPromiseB);
      expect(getCounter(defaultArea)).toBe(2);

      manuallyIncrementPromiseCounter();
      expect(getCounter(defaultArea)).toBe(3);

      // Assert
      Promise.all(promises).then(() => {
        expect(emitter.emit).toHaveBeenCalledTimes(5);

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
          true,
          defaultArea
        );

        expect(emitter.emit).toHaveBeenNthCalledWith(
          5,
          "promise-counter-update",
          true,
          defaultArea
        );
        expect(getCounter(defaultArea)).toBe(1);
        done();
      });
    });

    it("Promise returned must handle transparently the result when resolved and manuallyIncrementPromiseCounter fired", done => {
      // Arrange
      const expectedPromiseResult = "promise result";
      const promise = Promise.resolve(expectedPromiseResult);

      // Act
      const trackedPromise = trackPromise(promise);
      manuallyIncrementPromiseCounter();

      // Assert
      trackedPromise.then(trackedPromiseResult => {
        expect(trackedPromiseResult).toEqual(expectedPromiseResult);
        done();
      });
    });
  });

  describe("using custom area", () => {
    const testArea = "testArea";

    beforeEach(() => {
      manuallyResetPromiseCounter();
      manuallyResetPromiseCounter(testArea);
    });

    it("should call emitter.emit two time when feeding promise and area equals undefined and manuallyIncrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = undefined;

      // Act
      trackPromise(myPromise, area);
      manuallyIncrementPromiseCounter(area);

      // Assert
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
        true,
        defaultArea
      );
    });

    it("should call emitter.emit two time when feeding promise and area equals null and manuallyIncrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();
      const area = null;

      // Act
      trackPromise(myPromise, area);
      manuallyIncrementPromiseCounter(area);

      // Assert
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
        true,
        defaultArea
      );
    });

    it("should call emitter.emit two time when feeding promise and area equals testArea and manuallyIncrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise = Promise.resolve();

      // Act
      trackPromise(myPromise, testArea);
      manuallyIncrementPromiseCounter(testArea);

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

    it("should call emitter.emit three times when feeding two promises in same area and manuallyIncrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();

      // Act
      trackPromise(myPromise1, testArea);
      trackPromise(myPromise2, testArea);
      manuallyIncrementPromiseCounter(testArea);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(3);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        true,
        "testArea"
      );
    });

    it("should call emitter.emit three times when feeding three promises in different areas and manuallyIncrementPromiseCounter fired", () => {
      // Arrange
      emitter.emit = jest.fn();

      const myPromise1 = Promise.resolve();
      const myPromise2 = Promise.resolve();
      const myPromise3 = Promise.resolve();

      const area1 = "testArea1";
      const area2 = "testArea2";

      // Act
      trackPromise(myPromise1, area1);
      trackPromise(myPromise2, area2);
      trackPromise(myPromise3, area2);
      expect(getCounter(area1)).toBe(1);
      expect(getCounter(area2)).toBe(2);
      manuallyIncrementPromiseCounter(area2);

      // Assert
      expect(emitter.emit).toHaveBeenCalledTimes(4);
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
      expect(emitter.emit).toHaveBeenNthCalledWith(
        3,
        "promise-counter-update",
        true,
        "testArea2"
      );
      expect(emitter.emit).toHaveBeenNthCalledWith(
        4,
        "promise-counter-update",
        true,
        "testArea2"
      );
      expect(getCounter(area1)).toBe(1);
      expect(getCounter(area2)).toBe(3);

      // Reset
      manuallyResetPromiseCounter(area1);
      manuallyResetPromiseCounter(area2);
    });
  });
});
