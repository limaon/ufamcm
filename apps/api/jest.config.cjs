const { createDefaultEsmPreset } = require('ts-jest');

const preset = createDefaultEsmPreset({
  tsconfig: './tsconfig.json',
});

module.exports = {
  ...preset,

  testEnvironment: 'node',
  testTimeout: 30_000,

  roots: ['<rootDir>/src', '<rootDir>/test'],

  testMatch: ['**/*.test.ts'],

  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
