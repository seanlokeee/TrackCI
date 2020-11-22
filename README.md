# Introduction To The Problem

A customer web application under src using NodeJS, Vue.js and PostgreSQL is created. But the issue with the current build, testing and deployment is that these processes are being done manually from the lead developer's laptop. This is a big issue because if the lead developer is not available when an important build & test & deployment of the application is needed for the customer, nobody else can do the process and hence, the customer will need to wait. 

## Other Underlying Issues From The Problem

- High risk that bugs appear in production due to the overreliance on a single source of manual build and test. Therefore, testing might not always be performed every build and even if the build is successful in the local environment, the build might break in the production environment.
- This increases the number of support calls from the customer which leads to the support and development team to work overtime to manage the load and fix the issues.
- This leads to reduced morale with both of the teams and also impact the future revenue of the company due to customer's dissatisfaction.

# Solution To The Problem

To resolve the problem of a single point of failure, the company should introduce the role of DevOps. DevOps is a set of practices that works to automate and integrate the processes between the development and operations teams, so they can build, test and release software faster. So, one of the sections of DevOps is **Continuous Integration** which is applied so that the support and development teams focus on delivering new features rather than supporting old and broken ones.

## Why Continuous Integration (CI)?

CI is validating the state of the code every time a developer pushes a commit on any branch to the git server through an automatic build. Each integration is verified by an automated build and automated tests, followed by creating a package that is ready for deployment.
- Reduced risk of bugs in production because bugs will be detected during the automated tests stage as every time a developer pushes a contribution to the shared repository, the build and test are triggered because the repository is linked to the CI pipeline.
- Also, adding a CI pipeline with an automated build eliminates the need to rely on the lead developer's laptop for building, testing and at a later stage, deployment as all developers will have access to this shared repository linked to the CI pipeline.

### CI Rules of Thumb
- Run for a max time of 15 minutes
- Fit as much validation as possible
- Run on every commit
- Don't generate an artifact for runs that aren't from a release branch as an artifact is a package of all the binaries and scripts required to deploy an application

## Branching Strategy
Branching is the starting point so if it is complex, by the time get to automatic deployments into production, will have multiplied that complexity many times over because every step in the process multiplies complexity.

**Do:**
- Simple as possible 
- Use Pull Requests to merge
- Integrate with CI

**Don't:**
- Branch per environment because not testing what is being deployed into production
- Branch to manage configuration because hard to keep application code in the same state

*Git Branch Name Format:* Starts with an alphabet (E.g. f/testing where f means that it is a feature branch) to differentiate it from other branches like hotfix