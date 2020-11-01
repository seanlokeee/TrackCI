### Introduction To The Problem
A customer web application under src using NodeJS, Vue.js and PostgreSQL is created. But the issue with the current build and testing is that this processes are being done manually from the lead developer's laptop. This is a big issue because if the lead developer is not available when an important build & test of the application is needed for the customer, nobody else can do the process and hence, the customer will need to wait.

### Other Underlying Issues From The Problem
- High risk that bugs appear in production due to the overreliance on a single source of manual build and test. Therefore, testing might not always be performed every build and even if the build is successful in the local environment, the build might break in the production environment.
- This increases the number of support calls from the customer which leads to the support and development team to work overtime to manage the load and fix the issues.
- This leads to reduced morale with both of the teams and also impact the future revenue of the company due to customer's dissatisfaction.

### Solution To The Problem
To resolve the problem of a single point of failure, the company should introduce the role of DevOps. DevOps is a set of practices that works to automate and integrate the processes between the development and operations teams, so they can build, test and release software faster.