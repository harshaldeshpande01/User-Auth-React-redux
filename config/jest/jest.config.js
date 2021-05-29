// this config file can be json or js
module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The root directory that Jest should scan for tests and modules within
  rootDir: '../../',

  coverageDirectory: '<rootDir>/coverage',

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  // The regexp pattern Jest uses to detect test files
  // testRegex: "((\\.|/*.)(test))\\.js?$",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  setupFiles: ['<rootDir>/config/jest/enzyme.config.js'],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx'],

  // [number|boolean] The bail config option can be used here to have Jest stop running tests after n failures
  bail: 0,

  // [boolean] Some modules export different versions based on whether they are operating in Node or a browser.
  browser: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // Activates notifications for test results
  notify: true,

  // Indicates whether each individual test should be reported during the run
  verbose: true,

  // A list of paths to snapshot serializer modules Jest should use for snapshot testing
  snapshotSerializers: ['enzyme-to-json/serializer'], // snapshotSerializers allows you to pass Enzyme wrappers directly to Jest’s snapshot matcher, without converting them manually by calling enzyme-to-json’s toJson function

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy', // For CSS Modules
  },
};
