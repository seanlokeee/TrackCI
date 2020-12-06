# Express Example

This repository demonstrates the usage of Sequelize within an [Express](https://expressjs.com) application
The implemented logic is a task tracking tool

## Configuration

Configuration can be found in `config/config.js`

### Environment Variables Used To Configure Application

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

This will start the application and create an sqlite database in your app dir
Just open [http://localhost:3000](http://localhost:3000)

## Building Docker Image

Docker-compose is a tool that comes with Docker which allows you to define an environment with one or more containers in a file for easy deployment and teardown on local machine

**Usage:** Standing up testing containers that need to be interacted with (E.g. An application with a frontend, backend and database, stand up 3 containers at the same time which covers each of those components and it will connect to the local machine while staying hidden in locahost) 

**Prerequisites:** Make sure to install docker-compose before running any command. By default, docker-compose will look for a file called `docker-compose.yml` in the folder you execute the command from

```
docker-compose up -d
docker ps
docker-compose down
```

**Script Explanation:**
- First command must run before running the integration test script as this builds the docker image, where -d is used to allow one terminal to run the testing, hiding the docker process which is used to start the container
- Second command checks what containers are currently being ran
- Third command is to stop the container

## Running Tests

### Linting

First actual step during CI build process after all necessary prerequisites have been completed. This ensures process which run fast are ran early to see failure quickly during the build process. Then, no need to wait for 15 minutes to find out that the build failed because of a typo

`test-lint` and `store-lint` script is used to run linting under `package.json`. To run linting locally, follow the commands listed on **Run Linting** in `config.yml`

**Script Explanation:**
- eslint only allows one format to run at a time so tap is to display linting of each file to circleci for readability purposes
- store-lint is to store results as an xml file in circleci as an artifact

### Unit Tests

[Mocha](https://mochajs.org) based unit test in application 

`test-unit` script is used to run unit tests under `package.json`. To run test locally, follow the commands listed on **Run Unit Tests** in `config.yml`

**Script Explanation:**
- nyc to show the code coverage on circleci screen for readability of unit tests as unit tests are supposed to give the coverage of the code so need to see whether unit tests cover a large enough % generally, 70%+ of the codebase
- reporter command saves test report in an xml file and saves it in test-output folder. Test results are uploaded to CI tool for easy visibility for developers as developers should not scratch their head to dig deep to see unit tests results 

### Code Coverage

The report is uploaded to https://codecov.io/ during the CircleCI build when a commit is pushed to github. Codecov provides an integrated tool to group, merge, archive and compare coverage reports so that a comparison between the previous CI run and current run can be made to compare the impact of changes which are made. Codecov is chosen because it is easier to upload reports using istanbul(nyc) commands. `codecov.yml` presents an opportunity to set multiple failure conditions (E.g. if app's code coverage does not pass over 70%, current code coverage step stops, and the build proceeds to fail). `CODECOV_TOKEN` is set in CI provider (CircleCI) instead of workflow file (config.yml) for privacy

`test-coverage` script is used to run code coverage under `package.json`. To generate a code coverage report locally, `npm run test-coverage` and check coverage folder

**Script Explanation:**
- nyc report to store the results as lcov.info and a full web report (html, css and javascript) for browser viewing

### Integration Tests

**NOTE:** The default port of postgres is 5432 as the application didn't explicitly change the postgres local port so the docker container running, acting as a db can connect to the local port. Therefore, make sure that the port 5432 is free for use by quitting any application (E.g. postgres running in the background) occupying the port, otherwise, `servian database not exist sequelize error` will pop out

Integration tests are implemented using Mocha as well. To perform testing locally, `docker-compose.yml` must stand up before running the script because a postgres database must be present in order to test integration between database and application (frontend & backend). Follow the commands in **Building Docker Image** section of this README

`test-integration` script is used to run integration tests under `package.json`. To run test locally, follow the commands listed on **Run Integration Tests**

**Script Explanation:**
- Environment variables of the database details need to pass in order to access the servian database
- reporter has the same explanation as unit test script

### End To End Tests

E2E tests are implemented using QaWolf and requires a database backend to execute properly - https://www.qawolf.com/ 

As said in **Integration Tests Section**, make sure local port 5432 is free for use before starting the container. To perform testing locally, `docker-compose.yml` must stand up before running the script because a postgres database must be present in order to test back & forth round trip between database and application

`e2e.sh` script is used for convenience as it requires only a single command `sh e2e.sh` to run all commands in it which sets up e2e test environment and starts running e2e tests. It only requires a single terminal to be open to run the test successfully and the terminal can be re-used again locally

`start:prod` starts the application in a suitable environment by passing database details as environment variables in order to access the servian database, the npx command waits for returning http code 2XX HEAD and `test-e2e` script is used to run e2e tests. To run test locally, run `sh e2e.sh` in the terminal

To kill local host port running the application, `npx kill-port 3000`

**Script Explanation:**
- Environment variable `QAW_HEADLESS` set to true to run the e2e in headless mode
- The last 2 flags in test-e2e prevents terminal from hanging when the test suites have finished running so preventing timeout issues


