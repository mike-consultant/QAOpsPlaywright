const config = {
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  retries: 1,
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',
  },
};

module.exports = config;