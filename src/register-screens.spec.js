// @flow

import { Navigation } from 'react-native-navigation';

import registerScreens from './register-screens';

describe('RegisterScreens', () => {
  beforeEach(() => {
    Navigation.registerComponent = jest.fn();
  });

  it('should register news tab', () => {
    registerScreens();
    expect(Navigation.registerComponent).toHaveBeenCalledWith('News', expect.any(Function));
  });
});
