# Testing `Field Validation` Component

## Description
This test suite verifies the behavior of the `FieldValidation` component.

## Setup
- The `render`, `screen`, and `fireEvent` functions are imported from `@testing-library/react`.
- The `FieldValidation` component is imported from `@/components/FieldValidation`.

## Test Cases

### 1. Returns Validation Object with True and Message if Check is True
- **Description:** Tests whether the `FieldValidation` function returns a validation object with true and a message if the check is true.
- **Test Steps:**
  1. Call the `FieldValidation` function with `true`.
- **Expected Behavior:** The function should return a validation object with `required` set to true and a message indicating "Please enter a valid value".

### 2. Returns Validation Object with False if Check is False
- **Description:** Tests whether the `FieldValidation` function returns a validation object with false if the check is false.
- **Test Steps:**
  1. Call the `FieldValidation` function with `false`.
- **Expected Behavior:** The function should return a validation object with `required` set to false.

### Results
The test suite passes both tests. 
