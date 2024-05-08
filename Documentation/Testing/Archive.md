# Testing `Archive` Page

# API Tests

## Description
This test suite verifies the behavior of API endpoints using `Axios` for `HTTP` requests.

## Test Cases

### 1. GET /api/changes/:id returns observation details
- **Description:** Tests whether the `GET` request to retrieve observation details from the API endpoint returns the expected data.
- **Test Steps:**
  1. Mock the Axios `GET` request to return sample observation data.
  2. Make a `GET` request to the API endpoint.
- **Expected Behavior:** The response should contain the observation data matching the provided observation ID.

### 2. DELETE /api/changes/:id deletes the observation
- **Description:** Tests whether the `DELETE` request to delete an observation from the API endpoint is successful.
- **Test Steps:**
  1. Mock the `Axios` `DELETE` request to return a success message.
  2. Make a `DELETE` request to the API endpoint.
- **Expected Behavior:** The response should contain a success message indicating the observation deletion was successful.

### 3. PUT /api/changes/:id updates the observation
- **Description:** Tests whether the `PUT` request to update an observation on the API endpoint is successful.
- **Test Steps:**
  1. Mock the `Axios` `PUT` request to return a success message.
  2. Make a `PUT` request to the API endpoint with updated observation data.
- **Expected Behavior:** The response should contain a success message indicating the observation update was successful.

### 4. POST /api/upload creates a new observation
- **Description:** Tests whether the `POST` request to create a new observation on the API endpoint is successful.
- **Test Steps:**
  1. Mock the `Axios` `POST` request to return a success message.
  2. Make a `POST` request to the API endpoint with new observation data.
- **Expected Behavior:** The response should contain a success message indicating the new observation creation was successful.

### Results

All the tests pass, and all the API calls are made successfully. 