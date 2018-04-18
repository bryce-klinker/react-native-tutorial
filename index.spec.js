/* eslint-disable global-require */
// @flow

import { Navigation } from 'react-native-navigation';

describe('Index', () => {
  let registerScreensMock;

  beforeEach(() => {
    Navigation.startTabBasedApp = jest.fn();
    jest.mock('./src/register-screens');
    registerScreensMock = require('./src/register-screens').default;
  });

  function assertStartedWithTab(screenName) {
    expect(Navigation.startTabBasedApp).toHaveBeenCalledWith(
      expect.objectContaining({
        tabs: expect.arrayContaining([
          expect.objectContaining({
            label: screenName,
            screen: screenName,
          }),
        ]),
      }),
    );
  }

  it('should start tab application', () => {
    require('./index');

    assertStartedWithTab('News');
  });

  it('should register screens', () => {
    require('./index');
    expect(registerScreensMock).toHaveBeenCalled();
  });
});
