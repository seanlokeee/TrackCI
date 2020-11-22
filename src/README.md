# Express Example

This repository demonstrates the usage of Sequelize within an [Express](https://expressjs.com) application.
The implemented logic is a simple task tracking tool.

## Configuration

Configuration can be found in `config/config.js`

### Environment variables used to configure the application

- DB_USERNAME - username for the database server
- DB_PASSWORD - password for the database server
- DB_NAME - name of the database
- DB_HOSTNAME - hostname of the database server

## Starting App

*Without Migrations*

```
npm install
npm start
```

**With Migrations**

```
npm install
node_modules/.bin/sequelize db:migrate
npm start
```

This will start the application and create an sqlite database in your app dir.
Just open [http://localhost:3000](http://localhost:3000).

## Building the docker image

TODO

## General Tests Rules (DevOps Perspective)
Write more fast tests, and use the slower tests to only test what you can't test with the fast ones. So, in this case, 3 tests are being performed, unit being the quickest and end-2-end being the slowest where integration is in between

Take note if all the tests succeed, the time to execute, code coverage and make sure that if tests are executed and they fail, that people are notified, and also that when something is broken, limit the impact that has on the other people you work with, meaning don't allow merging of broken code.

## Running Tests

### Unit tests
Fast way to verify that the logic inside your application does what it is supposed to do

There are [Mocha](https://mochajs.org) based unit test in the application. A great tool to verify that the implemented changes haven't had an adverse effect on another part of application

Under `package.json`, there is a `test-unit` script which is used to run the unit tests called `nyc mocha test/unit --reporter mocha-junit-reporter --reporter-options mochaFile=./test-output/unittestresult.xml`
- nyc to show the code coverage on circleci screen for readability of unit tests as unit tests are supposed to give the coverage of the code so need to see whether unit tests cover a large enough % generally, 70%+ of the codebase.
- reporter command saves the unit test report in an xml file and saves it in test-output. The test results are uploaded to CI tool for easy visibility for developers as developers should not scratch their head to dig deep to see unit tests results.

### Linting

TODO: add ESLint command

### Code coverage

TODO: Add istanbul(nyc) commands

### Integration tests

Integration tests are implemented using Mocha as well. 

TODO: set up integration test environment and run integration tests


### End to end test

E2E tests are implemented using QaWolf and requires a database backend to execute properly.

Set the environment variable `QAW_HEADLESS` to true to run the e2e in headless mode

https://www.qawolf.com/

TODO: Set up e2e test environment and run the e2e tests