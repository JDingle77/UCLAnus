# API Documentation

## GET /get-bathroom

- **Description:** Retrieve information about bathrooms.
- **HTTP Method:** GET
- **Parameters:**
  - 'bathroomId' (integer, required): query parameter
- **Expected Output:** JSON object with bathroom information.
- **Code Implementation:** [bathroom.js]

## GET /get-review

- **Description:** Retrieve information about reviews.
- **HTTP Method:** GET
- **Parameters:**
  - 'bathroomId' (integer, optional): query parameter
  - 'userId' (integer, optional): query parameter
- **Expected Output:** JSON object with review information.
- **Code Implementation:** [review.js]

## POST /add-review

- **Description:** Add a review for a bathroom.
- **HTTP Method:** POST
- **Parameters:** JSON object with review details.

  - 'description' (string, optional)

- **Expected Output:** JSON object indicating success or failure.
- **Code Implementation:** [review.js]

  - 'bathroomId' (integer, required)
  - 'userId' (integer, required)
  - 'rating' (integer, required)

  ## POST /submit-report

- **Description:** Add a report for a bathroom.
- **HTTP Method:** POST
- **Parameters:** JSON object with report details.
  - 'bathroomId' (integer, required)
  - 'userId' (integer, required)
  - 'reported' (integer, required)
- **Expected Output:** JSON object indicating success or failure.
- **Code Implementation:** [review.js]

## GET /get-user

- **Description:** Retrieve information about user.
- **HTTP Method:** GET
- **Parameters:**
  - 'userId' (integer, required): search query
- **Expected Output:** JSON object with user information.
- **Code Implementation:** [user.js]

## POST /update-username

- **Description:** Change a user's username.
- **HTTP Method:** POST
- **Parameters:** JSON object with username details.
  - 'value' (string, required)
- **Expected Output:** JSON object indicating success or failure.
- **Code Implementation:** [user.js]

## POST /update-name

- **Description:** Add a review for a bathroom.
- **HTTP Method:** POST
- **Parameters:** JSON object with name details.
  - 'value' (string, required)
- **Expected Output:** JSON object indicating success or failure.
- **Code Implementation:** [user.js]

## GET /get-favorite

- **Description:** Retrieve information about favorite bathrooms.
- **HTTP Method:** GET
- **Parameters:**
  - 'userId' (integer, required): search query
- **Expected Output:** JSON object with favorite bathroom information.
- **Code Implementation:** [favorite.js]

## POST /change-favorite

- **Description:** Add or remove favorite bathroom from userlist.
- **HTTP Method:** POST
- **Parameters:** JSON object with review details.
  - 'bathroomId' (integer, required)
  - 'userId' (integer, required)
- **Expected Output:** JSON object indicating success or failure.
- **Code Implementation:** [favorite.js]
