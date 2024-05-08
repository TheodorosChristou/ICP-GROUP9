# Jest and React Testing Library Documentation

## Overview

Jest and React Testing Library are integral tools for testing React applications. Jest, a JavaScript testing framework developed by Facebook, offers features such as snapshot testing and built-in mocking to ensure efficient and reliable tests. On the other hand, React Testing Library provides utility functions encouraging a user-centric testing approach, focusing on what the user can see and interact with rather than implementation details. Its philosophy emphasizes accessibility and DOM testing, making it easier to write tests that simulate user interactions. Together, Jest and React Testing Library form a powerful combination for testing React components, enabling developers to create comprehensive and user-focused test suites. In a typical setup, Jest serves as the testing framework orchestrating the tests, while React Testing Library's utilities simplify the interaction and assertion on React components, fostering a testing methodology aligned with user experience.

## Configuration

### Jest-config.js

**Import next/jest:**
- Imports the `next/jest` module, a package provided by Next.js for Jest configurations tailored to Next.js projects.

**Create Jest Config:**
- Calls `nextJest` with an object specifying the app's directory (`dir: './'`) to load Next.js configuration files (`next.config.js` and `.env`) in the test environment.

**Custom Jest Configuration:**
- Defines a custom Jest configuration object (`config`) with options such as:
  - `setupFilesAfterEnv`: An array of setup files to run after Jest setup, pointing to a setup file at the root directory (`jest.setup.js`).
  - `testEnvironment`: Specifies the test environment, set to 'jest-environment-jsdom' for JSDOM (JavaScript implementation of the DOM).
  - `preset`: Uses the Jest preset for TypeScript (`ts-jest`), indicating integrated TypeScript support.

**Export Configuration:**
- Exports the Jest configuration using `module.exports`, and `createJestConfig` ensures asynchronous configuration creation for proper Next.js loading.

### Jest-setup.js

**Import `@testing-library/jest-dom`:**
- Adds extended matchers to Jest from the `@testing-library/jest-dom` library.
- This import enhances Jest's built-in matchers to provide additional functionality for testing DOM elements.
- It allows for more intuitive and readable assertions in tests, making it easier to write and maintain test cases for React components.
**Import `dotenv`:**
- This import has been made so that the jest could interact with .env file of the project. 
**Import `TextEncoder, TextDecoder`:**
- As Jest doesn't provide TextDecoder and TextEncoder by default therefore they have been provided to ensure compatibility with code. 
**Import `enableFetchMocks`:**
- This impport configures Jest to mock the 'Fetch' requests, once implemented, calls to fetch can be made with the mock setup instead of making actual network calls. 

### jest.polyfills.js

Pollyfills is a part of the set up, it allows all the imports made in the setup and more modules be globally available in the Node environment. 

### setupTests.js

This part of the set up is a loading environment, it loads variables from .env. into process.env, which allows the variables to be accessed and executed throughout the application. 

## More:
https://jestjs.io/

https://testing-library.com/docs/react-testing-library/intro/

https://nextjs.org/docs/pages/building-your-application/optimizing/testing