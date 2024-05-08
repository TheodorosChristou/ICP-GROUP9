# Testing `Uploading` Component

## Description
This test suite aims to verify the behavior of the `Uploading` component.

## Setup
- The `render`, `fireEvent`, `waitFor`, and `screen` functions are imported from `@testing-library/react`.
- The `Uploading` component is imported from `@/pages/index`.
- The `axios` library is imported for mocking HTTP requests.
- The `QueryClient` and `QueryClientProvider` are imported from `react-query` for testing components that use React Query.
- The session context is mocked using Jest's mocking capabilities to simulate user authentication.

## Test Dependencies
- **Dependencies:**
  - `@testing-library/react`: Provides utilities for testing React components.
  - `@/pages/index`: The `Uploading` component to be tested.
  - `axios`: Library for making HTTP requests.
  - `react-query`: Library for managing server state in React applications.

## Mocking Dependencies
- The `next-auth/react` module is mocked to provide a mock user session for testing purposes.
- The `axios` module is mocked to simulate HTTP requests.

## Test Cases

### 1. Renders Without Crashing
- **Description:** Tests whether the `Uploading` component renders without errors.
- **Test Steps:**
  1. Render the `Uploading` component with mock observations.
  2. Check if the "On-Going Incidents" text is present in the rendered output.
- **Expected Behavior:** The component should render successfully without crashing.
- **Test Result:** The component renders without crashing

### 2. Submits Observation Form
- **Description:** Tests whether the observation form submission behavior works as expected.
- **Test Steps:**
  1. Render the `Uploading` component with mock observations.
  2. Mock the response of the `axios.post` method.
  3. Simulate a form submission by clicking the submit button.
  4. Wait for the form submission to complete.
- **Expected Behavior:** After form submission, the user should be redirected to the homepage (`'/'`).
- **Test Result:** The form is submitted successfully and the user is redirected to homepage (`'/'`) with fresh observation form.

