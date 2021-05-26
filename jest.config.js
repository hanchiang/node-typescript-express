module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '__tests__/config'],
};
