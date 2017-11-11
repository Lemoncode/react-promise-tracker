import {trackPromise, emitter} from './trackHttp';
import {Emitter} from './tinyemmiter';


describe('trackPromise', () => {
  test('Initial case, promise emitter.emit is called', () => {
    // Arrange

    emitter.emit = jest.fn((a,b) => {
      return;
    });


    //const myPromise = new Promise((resolve, reject) => {});
    const myPromise =  Promise.resolve().then(() => {
      expect(true).toBe(true)
    });

    // Act
    trackPromise(myPromise);

    // Assert
    expect(emitter.emit).toHaveBeenCalledTimes(1);
  });
});

