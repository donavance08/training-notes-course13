import './index.js';
import appMock from './app';

jest.mock('./app');

describe('index.js - app entry', () => {
  it('should call app.listen()', () => {
    expect(appMock.listen).toHaveBeenCalled();
  });
});
