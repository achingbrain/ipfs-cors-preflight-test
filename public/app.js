/* global location */
'use strict'

const client = require('ipfs-http-client')
const $output = document.querySelector('#output')

async function main () {
  const go = client({
    host: '127.0.0.1',
    port: 5001,
    headers: {
      'X-Stream-Output': '*' // custom header forces preflight
    }
  })

  try {
    $output.innerText += `go id: ${(await go.id()).id}\n`
  } catch (err) {
    $output.innerText = err.stack
  }
}

main()
