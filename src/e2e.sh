#!/bin/bash 
npm run start & 
npx wait-on http://localhost:3000
npm run test-e2e
npx kill-port 3000