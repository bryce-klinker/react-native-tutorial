// @flow

import { Navigation } from 'react-native-navigation';
import NewsScreen from './news/NewsScreen';

export default function registerScreens() {
  Navigation.registerComponent(NewsScreen.screenName, () => NewsScreen);
}
