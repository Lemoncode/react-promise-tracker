import {trackPromise, emitter} from './trackHttp';
import {Emitter} from './tinyemmiter';

//jest.mock('emitter', jest.fn)

describe('trackPromise', () => {
  test('Initial case, promise emitter.emit is called', () => {
    // Arrange
    // Act 
    // Assert
    expect(emitter.emit).toHaveBeenCalled(1);
  });
});

