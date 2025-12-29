module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.js', '!node_modules/**', '!coverage/**', '!jest.config.js'],
  testMatch: ['**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
