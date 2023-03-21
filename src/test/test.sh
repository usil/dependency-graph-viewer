#!/bin/bash

if [ "$verbose_test" == 'true' ]
then
  nyc --reporter=html --reporter=json-summary mocha  'src/test/**/*.test.js' --exit && npm run badges
else
  nyc --reporter=html --reporter=json-summary mocha  'src/test/**/*.test.js' --exit --require mocha-suppress-logs && npm run badges
fi