'use strict'

const path = require('path')
const execa = require('execa')
const { createFactory } = require('ipfsd-ctl')
const df = createFactory({
  ipfsHttpModule: require('ipfs-http-client'),
  ipfsBin: require('go-ipfs').path(),
  test: true
})
const {
  startServer
} = require('test-ipfs-example/utils')
const pkg = require('./package.json')

async function testUI (env) {
  const proc = execa(path.resolve(__dirname, 'node_modules/.bin/nightwatch'), [ '--config', path.resolve(__dirname, 'nightwatch.conf.js'),  path.join(__dirname, 'test.js') ], {
    cwd: path.resolve(__dirname, '../'),
    env: {
      ...process.env,
      ...env,
      CI: true
    },
    all: true
  })
  proc.all.on('data', (data) => {
    process.stdout.write(data)
  })

  await proc
}

async function runTest () {
  const server = await startServer(__dirname)

  const go = await df.spawn({
    ipfsOptions: {
      config: {
        API: {
          HTTPHeaders: {
            'Access-Control-Allow-Origin': [
              server.url
            ]
          }
        },
        Addresses: {
          API: '/ip4/127.0.0.1/tcp/5001'
        }
      }
    }
  })

  try {
    await testUI({
      IPFS_EXAMPLE_TEST_URL: server.url
    })
  } finally {
    await server.stop()
    await go.stop()
  }
}

module.exports = runTest

module.exports[pkg.name] = function (browser) {
  browser
    .url(process.env.IPFS_EXAMPLE_TEST_URL)
    .waitForElementVisible('#output')
    .pause(1000)

  browser.expect.element('#output').text.to.contain('go id')

  // uncomment me to poke around in the browser during a test run
  // browser.pause(100000000)

  browser.end()
}
