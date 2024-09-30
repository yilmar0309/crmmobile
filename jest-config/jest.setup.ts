import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import {HttpResponse, http} from 'msw';
import {setupServer} from 'msw/node';
import {apiLeadsBase} from '../src/leads/constants/api';
import { NativeModules } from 'react-native';

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  log: console.log,
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const server = setupServer(
  http.get(
    `${apiLeadsBase.baseUrl}${apiLeadsBase.endpoints.leads}`,
    ({params}) => {
      return HttpResponse.json({
        id: params.id,
        title: 'Porcelain Mug',
        price: 9.99,
      });
    },
  ),
  /*   http.get(
    `${apiPublicationBase.baseUrl}${apiPublicationBase.endpoints.publication}`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          data: [
            {id: 1, title: 'Test Publication 1'},
            {id: 2, title: 'Test Publication 2'},
          ],
          message: 'Fetched successfully',
        }),
      );
    },
  ), */
);

NativeModules.StatusBarManager = {
  getHeight: jest.fn((callback) => {
    callback({ height: 20 }); // You can adjust the height value as needed
  }),
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let mockCurrentColorScheme = 'light';
const mockAppearanceEventEmitter = new EventEmitter();
const mockGetColorScheme = jest.fn(() => mockCurrentColorScheme);

/**
 * @see {@link https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Utilities/Appearance.js}
 */
jest.mock('react-native/Libraries/Utilities/Appearance', () => {
  return {
    getColorScheme: mockGetColorScheme,

    addChangeListener: listener => {
      return mockAppearanceEventEmitter.addListener('change', listener);
    },
    setColorScheme: colorScheme => {
      mockCurrentColorScheme = colorScheme;
      mockAppearanceEventEmitter.emit('change', {colorScheme});
    },
  };
});

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('@react-navigation/elements', () => ({
  useHeaderHeight: jest.fn(() => 64), // Asume un valor de altura de cabecera para las pruebas
}));

jest.mock('react-native-version-number', () => ({
  appVersion: '1.0.0',
  buildVersion: '123',
  bundleIdentifier: 'com.example.app',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
  multiMerge: jest.fn(),
  flushGetRequests: jest.fn(),
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
  useController: jest.fn(() => ({
    field: {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: '',
    },
  })),
}));

jest.mock('react-native-screens', () => ({enableScreens: jest.fn()}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));
