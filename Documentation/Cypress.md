# Cypress Testing


## Un-Logged-In User Home Page Test

This test suite aims to verify the behavior of the home page for un-logged-in users.


### Setup:

•	Before each test, the application is visited, and the viewport is set.

### Tests:

•	Ensure main elements such as title and subheading are displayed.

•	Verify the functionality of the cookie prompt, including acceptance and disappearance after acceptance.

•	Test form submission with incorrect input and ensure validation messages are shown.

•	Test form submission with correct input and confirm submission confirmation.

### Logged-In User Home Page Test:

This test suite focuses on verifying the behavior of the home page for logged-in users.

### Tests:

•	Verify the functionality of the cookie prompt, similar to the un-logged-in user test.

•	Test map functionality by interacting with markers and popups.

•	Test updating observations made by the user and confirm the update.

•	Test deleting observations and confirm their removal.

•	Ensure on-going tickets are displayed.

•	Verify the presence of table headers and their respective content.

•	Test search functionality by filtering observations based on a specific identifier.

•	Check the display and functionality of weather information icons and tooltips.

•	Navigate to the archive page and ensure its elements and functionality are as expected.

### Status:

•	All tests passed successfully, confirming the expected behavior of the home page for both un-logged-in and logged-in users.
