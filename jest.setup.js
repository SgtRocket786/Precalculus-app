// jest.setup.js
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-native-webview', () => 'WebView');
jest.mock('react-native-showdown', () => 'Markdown');

