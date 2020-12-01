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
Docker-compose is a tool that comes with Docker which allows you to define an environment with one or more containers in a file for easy deployment and teardown on local machine

**Usage:** Standing up testing containers that need to be interacted with (E.g. An application with a frontend, backend and database, stand up 3 containers at the same time which covers each of those components and it will connect to the local machine while staying hidden in locahost) 

**Prerequisites:** Make sure to install docker-compose before running any command. By default, docker-compose will look for a file called `docker-compose.yml` in the folder you execute the command from. 

```
docker-compose up -d
docker ps
docker-compose down
```
- First command must run before running the integration test script as this builds the docker image, where -d is used to allow one terminal to run the testing, hiding the docker process which is used to start the container
- Second command checks what containers are currently being ran
- Third command is to stop the container

## General Tests Rules (DevOps Perspective)
Write more fast tests, and use slower tests to only test what you can't test with the fast ones. So, in this case, 3 tests are being performed, unit being the quickest and end-2-end being the slowest where integration is in between

Take note if all the tests succeed, the time to execute, code coverage and make sure that if tests are executed and they fail, that people are notified, and also that when something is broken, limit the impact that has on the other people you work with, meaning don't allow merging of broken code.

## Running Tests

### Unit tests
Fast way to verify that the logic inside your application does what it is supposed to do

There are [Mocha](https://mochajs.org) based unit test in the application. A great tool to verify that the implemented changes haven't had an adverse effect on another part of application

`test-unit` script is used to run unit tests under `package.json`. To run test locally, follow the commands listed on the **Run Unit Tests** in `config.yml`.

**Script Explanation:**
- nyc to show the code coverage on circleci screen for readability of unit tests as unit tests are supposed to give the coverage of the code so need to see whether unit tests cover a large enough % generally, 70%+ of the codebase.
- reporter command saves test report in an xml file and saves it in test-output folder. Test results are uploaded to CI tool for easy visibility for developers as developers should not scratch their head to dig deep to see unit tests results.

### Linting

TODO: add ESLint command

### Code coverage
Describe % of the application code covered by automated test suite to make sure that our tests cover majority of the logic in the application so that haven't missed anything major. A good code coverage % should be around 80%, depending on verbosity of language. 100% leads to developers gaming the system and not writing good tests.

The report is uploaded to https://codecov.io/. Codecov provides an integrated tool to group, merge, archive and compare coverage reports so that a comparison between the previous CI run and current run can be made to compare the impact of changes which are made. Codecov is chosen because it is easier to upload reports using istanbul(nyc) commands.

`test-coverage` script is used to run code coverage under `package.json`. To run test locally, follow the commands listed on the **Run Code Coverage** in `config.yml`.

**Script Explanation:**
- nyc report to store the results as lcov.info and a full web report (html, css and javascript) for browser viewing

### Integration tests
Test integrations between different components in the application, or integration to other services.

Unlike with Unit Testing where you might pass in mocking or stubbing objects to replace external services like the database or REST APIs, with integration tests, you only change configuration, like you would do in a production environment because infrastructure or containers are deployed to run the integration tests properly.

Integration tests are implemented using Mocha as well. To perform testing locally, `docker-compose.yml` must stand up before running the script because the postgres database must be present in order to test integration between database and application (frontend & backend). Follow the commands in **Building Docker Image** section of this README.

**NOTE:** The default port of postgres is 5432 as the application didn't explicitly change the postgres local port so the docker container running, acting as a db can connect to the local port. Therefore, make sure that the port 5432 is free for use by quitting any application (E.g. postgres running in the background) occupying the port, otherwise, `servian database not exist sequelize error` will pop out.

`test-integration` script is used to run integration tests under `package.json`. To run test locally, follow the commands listed on the **Run Integration Tests**.

**Script Explanation:**
- Environment variables of the database details need to pass in order to access the servian database
- reporter has the same explanation as unit test script

### End to end test

E2E tests are implemented using QaWolf and requires a database backend to execute properly.

Set the environment variable `QAW_HEADLESS` to true to run the e2e in headless mode

https://www.qawolf.com/

TODO: Set up e2e test environment and run the e2e tests