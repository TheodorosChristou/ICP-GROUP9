# Testing `Header` Component

## Description
This test suite verifies the behavior of the `Header` component.

## Setup
- The `Header` component is imported from `@/components/Header`.
- The `render`, `screen`, `fireEvent`, `waitFor`, and `useSession` functions are imported from `@testing-library/react`.
- The `signIn`, `signOut`, and `useSession` functions are imported from `next-auth/react`.

## Mocking Dependencies
- The `next-auth/react` module is mocked to simulate user authentication status using the `useSession` hook.

## Test Cases

### 1. Renders Logo and Title
- **Description:** Tests whether the `Header` component renders the logo and title.
- **Test Steps:**
  1. Render the `Header` component.
  2. Check if the logo, title, and "Emergency" text are present in the rendered output.
- **Expected Behavior:** The logo, title, and "Emergency" text should be rendered successfully.

### 2. Displays Login Button When User is Not Authenticated
- **Description:** Tests whether the `Header` component displays the login button when the user is not authenticated.
- **Test Steps:**
  1. Render the `Header` component.
  2. Check if the "Log In" button is present in the rendered output.
- **Expected Behavior:** The "Log In" button should be displayed.

### 3. Displays Logout Button When User is Authenticated
- **Description:** Tests whether the `Header` component displays the logout button when the user is authenticated.
- **Test Steps:**
  1. Mock the `useSession` hook to return authenticated status.
  2. Render the `Header` component.
  3. Check if the "Log Out" button is present in the rendered output.
- **Expected Behavior:** The "Log Out" button should be displayed.

### 4. Displays User Name When User is Authenticated
- **Description:** Tests whether the `Header` component displays the user's name when the user is authenticated.
- **Test Steps:**
  1. Mock the `useSession` hook to return authenticated status with user data.
  2. Render the `Header` component.
  3. Check if the user's name is displayed in the rendered output.
- **Expected Behavior:** The user's name should be displayed with a welcome message.

### 5. Displays Menu When Menu Icon is Clicked
- **Description:** Tests whether the `Header` component displays the menu when the menu icon is clicked.
- **Test Steps:**
  1. Render the `Header` component.
  2. Click on the menu icon.
  3. Check if the menu is visible.
  4. Click again to close the menu.
- **Expected Behavior:** The menu should appear when the menu icon is clicked and disappear when clicked again.

### Results
All the above tests pass and the header component works as expected

