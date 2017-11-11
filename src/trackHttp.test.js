import {trackPromise, emitter} from './trackHttp';
import {Emitter} from './tinyemmiter';


describe('trackPromise', () => {
  test('On Initial case, promise fired, promise emitter.emit is called', () => {
    // Arrange

    emitter.emit = jest.fn((a,b) => {
      return;
    });


    //const myPromise = new Promise((resolve, reject) => {});
    const myPromise =  Promise.resolve().then(() => {
      return "ok";
    });

    // Act
    trackPromise(myPromise);

    // Assert
    expect(emitter.emit).toHaveBeenCalledTimes(1);

    return myPromise;
  });

  test('Promise tracked, we got resolve, check that going zero emitter is sent', () => {
    // Arrange

    emitter.emit = jest.fn((a,b) => {
      return;
    });


    const myPromise =  Promise.resolve();

    // Act
    trackPromise(myPromise);

    // Assert
    myPromise.then(() => {
      expect(emitter.emit).toHaveBeenCalledTimes(2);
    });

    return myPromise;
  });
});

