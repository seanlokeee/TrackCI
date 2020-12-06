# Introduction To The Problem

A customer web application under src using NodeJS, Express.js and PostgreSQL is created. But the issue with current build, testing and packing is that these processes are being done manually from lead developer's laptop. This is a big issue because if the lead developer is not available when an important build, test & packing of the application is needed for a customer, nobody else can do the process and hence, the customer will need to wait 

## Other Underlying Issues From The Problem

- High risk that bugs appear in production due to the overreliance on a single source of manual build and test. Therefore, testing might not always be performed every build and even if the build is successful in the local environment, the build might break in the production environment
- This increases number of support calls from the customer which leads to support and development team to work overtime to manage load and fix issues
- This leads to reduced morale with both of the teams and also impact future revenue of the company due to customer's dissatisfaction

# Solution To The Problem

To resolve the problem of a single point of failure, the company should introduce role of DevOps. DevOps is a set of practices that works to automate and integrate the processes between development and operations teams, so they can build, test and package software faster. So, one of the sections of DevOps is **Continuous Integration** which is applied so that support and development teams focus on delivering new features rather than supporting old and broken ones

Under a hidden folder (.circleci), `config.yml` file is created to perform CI

## Why Continuous Integration (CI)?

CI is validating state of the code every time a developer pushes a commit on any branch to the git server through an automatic build. Each integration is verified by an automated build and automated tests, followed by creating a package that is ready for deployment which runs only on master branch
- Reduced risk of bugs in production because bugs will be detected during the automated tests stage as every time a developer pushes a contribution to shared repository, build and test are triggered because the repository is linked to the CI pipeline
- Also, adding a CI pipeline with an automated build eliminates the need to rely on the lead developer's laptop for building, testing and packing as all developers will have access to this shared repository linked to the CI pipeline

### CI Rules Of Thumb

- Run for a max time of 15 minutes
- Fit as much validation as possible
- Run on every commit
- Don't generate an artifact for runs that aren't from a release branch as an artifact is a package of all the binaries and scripts required to deploy an application

# Branching Strategy

Branching is the starting point so if it is complex, by the time get to automatic deployments into production, will have multiplied that complexity many times over because every step in the process multiplies complexity

**Do:**
- Simple as possible 
- Use Pull Requests to merge
- Integrate with CI

**Don't:**
- Branch per environment because not testing what is being deployed into production
- Branch to manage configuration because hard to keep application code in the same state

*Git Branch Name Format:* Starts with an alphabet (E.g. f/testing where f means that it is a feature branch) to differentiate it from other branches like hotfix

# General Tests Rules (DevOps Perspective)

Write more fast tests, and use slower tests to only test what you can't test with the fast ones. So, in this case, 3 tests are being performed, unit being the quickest and end-2-end being the slowest where integration is in between

Take note if all the tests succeed, the time to execute, code coverage and make sure that if tests are executed and they fail, that people are notified, and also that when something is broken, limit the impact that has on the other people you work with, meaning don't allow merging of broken code

# Processes In CircleCI Pipeline 

The processes below which are currently being performed locally are integrated to the CI pipeline so that the application can be built and tested automatically

## Linting

Scan application code to make sure that everyone follows the same styling guidelines which ensures high code quality. Guidelines must be in place because different people working on the same project have different code indentation or there might be loops inside loops, slowing the application down. Therefore, linting ensures code readability by enforcing consistency

## Unit Testing 

Fast way to verify that the logic inside your application does what it is supposed to do. A great tool to verify that the implemented changes haven't had an adverse effect on another part of the application

## Code Coverage

Describe % of application code covered by automated test suite to make sure that our tests cover majority of the logic in the application so that haven't missed anything major. A good code coverage % should be around 80%, depending on verbosity of language. 100% leads to developers gaming the system and not writing good tests

## Integration Testing

Test integrations between different components in the application, or integration to other services

Unlike with Unit Testing where you might pass in mocking or stubbing objects to replace external services like the database or REST APIs, with integration tests, you only change configuration, like you would do in a production environment because infrastructure or containers are deployed to run the integration tests properly

## E2E Testing

Ensure round trip testing from the browser to the DB and back again is successful which is testing whether the flow of an application is behaving as expected from start to finish. This spots out system dependencies and ensures that data integrity is maintained between different system components. Thus, it ensures entire web app is ready for deployment

## Artifact
There are a couple of items being stored as artifacts on the CI pipeline. One of the items is the entire application itself and the rest of the items are the test, linting and coverage results as xml files

- Entire application artifact must contain any automated tests that will be run in different environments and be immutable because the same artifact gets deployed multiple times
- The items' xml files show in-depth details of the final results which can be opened on the web browser so that developers can see them easily and if there is a failure, these extra details help in further debugging