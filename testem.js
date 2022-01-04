/* eslint-env node */
module.exports = {
  "framework": "qunit",
  "test_page": "tests/index.html",
  "disable_watching": true,
  "launch_in_ci": [
    "Chrome"
  ],
  "launch_in_dev": [
    "Chrome"
  ],
  "browser_args": {
    "Chrome": ["--headless", "--disable-gpu", "--remote-debugging-port=9222"]
  },
  "phantomjs_debug_port": 9000
};
