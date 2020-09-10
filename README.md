# CORS preflight

Setting a custom header in a request triggers a pre-flight CORS request to the requested resource with an OPTIONS method and `Access-Control-Request-Method` and `Access-Control-Request-Headers` headers (mangled slightly by Hapi's logging):

```
req: {
  "id": "1599721333202:MacBook-Pro:11398:kewgrlgx:10000",
  "method": "options",
  "url": "/api/v0/id",
  "headers": {
    "host": "127.0.0.1:5002",
    "connection": "keep-alive",
    "accept": "*/*",
    "access-control-request-method": "POST",
    "access-control-request-headers": "x-stream-output",
    "origin": "http://127.0.0.1:8080",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-fetch-dest": "empty",
    "referer": "http://127.0.0.1:8080/",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-GB,en-US;q=0.9,en;q=0.8"
  },
  "remoteAddress": "127.0.0.1",
  "remotePort": 50523
}
```

The response should contain the `Access-Control-Allow-Origin` etc headers:

```
res: {
  "statusCode": 200,
  "headers": {
    "access-control-allow-origin": "http://127.0.0.1:8080",
    "access-control-allow-methods": "POST",
    "access-control-allow-headers": "Accept,Authorization,Content-Type,If-None-Match,X-Stream-Output,X-Chunked-Output,X-Content-Length",
    "access-control-max-age": 86400,
    "access-control-expose-headers": "WWW-Authenticate,Server-Authorization,X-Stream-Output,X-Chunked-Output,X-Content-Length",
    "cache-control": "no-cache",
    "content-length": 0
  }
}
```

To run this test against a daemon:

```console
$ npm i
$ npm test
```

### Hacking

* Edit the port settings in [public/app.js](./public/app.js) to send requests somewhere else
* Uncomment line 74 in [test.js](./test.js) to poke around in the browser during the test
