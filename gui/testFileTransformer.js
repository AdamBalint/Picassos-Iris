const path = require('path');

/**
 * This file transformer is to deal with imports for static assets when running tests.
 * We want to exclude static assets from our JS test runner (jest), because our test runner
 * can only deal with JS modules.
 *
 * When a static asset is encountered by jest, a simple string is returned.
 */

module.exports = {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
