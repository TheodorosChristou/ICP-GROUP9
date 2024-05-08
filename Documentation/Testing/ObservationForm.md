# ObservationForm Component Tests

## Description
This test suite verifies the behavior of the `ObservationForm` component.

## Setup
- The `render`, `screen`, `fireEvent`, and `waitFor` functions are imported from `@testing-library/react`.
- The `ObservationForm` component and `ObservationValues` are imported from `@/components/ObservationForm`.
- The `useSession` hook is mocked from `next-auth/react` to simulate user authentication.

## Test Cases

### 1. Renders the Form Fields Correctly
- **Description:** Tests whether the `ObservationForm` component renders the form fields correctly.
- **Test Steps:**
  1. Render the `ObservationForm` component.
  2. Assert that the latitude, longitude, and observation fields are rendered.
- **Expected Behavior:** The form fields should be rendered correctly.

### 2. Calls onSubmit with Form Data When Submitted
- **Description:** Tests whether the `onSubmit` function is called with the form data when the form is submitted.
- **Test Steps:**
  1. Render the `ObservationForm` component with a mock `onSubmit` function.
  2. Simulate user input by changing the values of the latitude, longitude, and observation fields.
  3. Click the submit button.
- **Expected Behavior:** The `onSubmit` function should be called with the form data containing the entered values.

