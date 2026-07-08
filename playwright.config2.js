// @ts-check
const { devices } = require('@playwright/test');

/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */

const config = {
  testDir: './tests', //e2e
  retries: 1, 
  //workers: 1, 

  // Maximum time one test can run
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'Safari Execution', // <-- Missing comma

      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failure',
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'on', // 'off' | 'on' | 'retain-on-failure'
        ...devices['iPad (gen 11)'],
        
      }
    },

    {
      name: 'Chrome Execution',
        use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on', // 'off' | 'on' | 'retain-on-failure'
        //viewport: {width:720, height:720}

      }
    }


    
  ]
};

module.exports = config;