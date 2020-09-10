'use strict'

module.exports = {
  src_folders: ['tests'],

  webdriver: {
    start_process: true,
    server_path: require.resolve('chromedriver/bin/chromedriver'),
    port: 4444,
    cli_args: [
      `--port=4444`
    ]
  },

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            //'headless'
          ]
        }
      }
    }
  },

  globals: {
    asyncHookTimeout: 120000,
    waitForConditionTimeout: 60000
  }
}
