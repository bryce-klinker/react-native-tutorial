import { fakeFetch } from "./src/api/fake-fetch";
import { AppRegistry } from 'react-native';
import App from './src/App';

global.fetch = fakeFetch;
AppRegistry.registerComponent('rntutorial', () => App);
