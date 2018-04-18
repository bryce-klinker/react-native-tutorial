import { Navigation } from 'react-native-navigation';
import NewsScreen from './src/news/NewsScreen';
import registerScreens from './src/register-screens';

registerScreens();
Navigation.startTabBasedApp({
  tabs: [
    {
      label: NewsScreen.label,
      screen: NewsScreen.screenName,
    },
  ],
});
