const { createDefaultEsmPreset } = require('ts-jest');

const preset = createDefaultEsmPreset({
  tsconfig: './tsconfig.json',
});

module.exports = {
  ...preset,
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
