export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/test/**/*.test.js', '**/src/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: ['src/**/*.js', '!src/main.jsx', '!src/**/*.test.js'],
  coverageDirectory: 'coverage',
  verbose: true,
};
