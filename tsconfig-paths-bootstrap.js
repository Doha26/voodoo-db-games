const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

const baseUrl = './dist';
const cleanup = tsConfigPaths.register({
  baseUrl,
  paths: {
    '@/*': ['*'],
    '@domain/*': ['domain/*'],
    '@application/*': ['application/*'],
    '@infrastructure/*': ['infrastructure/*'],
    '@presentation/*': ['presentation/*'],
  },
});

// When path registration is no longer needed
// cleanup();
