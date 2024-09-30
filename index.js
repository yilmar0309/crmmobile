import React from 'react';
import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import App from '@/App';
import {name as appName} from './app.json';
import store from '@/core/libraries/redux';

const Application = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
AppRegistry.registerComponent(appName, () => Application);
