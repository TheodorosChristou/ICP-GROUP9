# Testing `Cookie Banner` Component

## Description
This test suite verifies the behavior of the `CookieBanner` component.

## Setup
- The `render`, `screen`, and `fireEvent` functions are imported from `@testing-library/react`.
- The `CookieBanner` component is imported from `../src/components/CookieConsent`.

## Test Cases

### 1. Decline Button Handles Click
- **Description:** Tests whether the "Decline" button handles click events.
- **Test Steps:**
  1. Render the `CookieBanner` component.
  2. Find the "Decline" button element and simulate a click event.
- **Expected Behavior:** The `onClick` function should be called once.

### 2. Accept Button Handles Click
- **Description:** Tests whether the "Allow Cookies" button handles click events.
- **Test Steps:**
  1. Render the `CookieBanner` component.
  2. Find the "Allow Cookies" button element and simulate a click event.
- **Expected Behavior:** The `onClick` function should be called once.

### 3. Has a Heading
- **Description:** Tests whether the `CookieBanner` component has a heading.
- **Test Steps:**
  1. Render the `CookieBanner` component.
  2. Find the heading element with the appropriate text.
- **Expected Behavior:** The heading with the specified text should be present in the component.

### Resulta

This test suite fails to pass, as `g.tag` is not a globally available function, it has been set up for Google Analytics to recieve information from the app, but has not been set up for Jest to access. Rest assured the cookie banner has been tested via Cypress and the banner works as expected. 