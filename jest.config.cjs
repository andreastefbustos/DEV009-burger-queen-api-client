module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  setupFiles: ["jest-localstorage-mock"],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(css|png|jpg|jpeg)$": "<rootDir>/src/__mocks__/file-mock.cjs",
  },
};