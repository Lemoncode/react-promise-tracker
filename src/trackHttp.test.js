import {trackPromise, emitter} from './trackHttp';
import {Emitter} from './tinyemmiter';

jest.mock('emitter', jest.fn)

describe('trackPromise', () => {
  test('Initial case, promise emitter.emit is called', () => {
    // Arrange
    emitter.mockImplementation(
       () => ({
        emit: (a ,b) => {}
       })
    );

    const myPromise = new Promise((resolve, reject) => {});

    // Act
    trackPromise(promise)

    // Assert
    expect(emitter.emit).toHaveBeenCalled(1);
  });
});

