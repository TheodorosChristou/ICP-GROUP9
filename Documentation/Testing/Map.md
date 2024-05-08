# Testing `Dynamic Map` Component

## Description
This test suite verifies the behavior of the `DynamicMap` component and the `getServerSideProps` function in the `/map` page.

## Setup
- The `render` and `waitFor` functions are imported from `@testing-library/react`.
- The `DynamicMap` component and the `getServerSideProps` function are imported from `@/pages/map`.
- The `ObservationModel` and `ObservationInterface` are imported from respective files.
- The `GetServerSidePropsContext` type is imported from `next`.

## Test Cases

### 1. Renders Correctly
- **Description:** Tests whether the `DynamicMap` component renders correctly.
- **Test Steps:**
  1. Render the `DynamicMap` component with mock observation data.
  2. Take a snapshot of the rendered container.
- **Expected Behavior:** The rendered container should match the snapshot.

### 2. Fetches Data from Database and Returns mapData Prop
- **Description:** Tests whether the `getServerSideProps` function fetches data from the database and returns the `mapData` prop.
- **Test Steps:**
  1. Mock the `ObservationModel.find` method to return sample observation data.
  2. Call the `getServerSideProps` function with a mocked context.
  3. Check if the returned props contain the `mapData` prop with observation data.
- **Expected Behavior:** The returned props should contain the `mapData` prop with the sample observation data.

### Results

Both the tests pass and the component renders successfully and also fetches data from the database.