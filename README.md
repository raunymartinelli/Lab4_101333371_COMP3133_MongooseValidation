
# Lab4_101333371_COMP3133_MongooseValidation

# Lab 04 - Mongoose Validation

## Overview
Lab 04 focuses on implementing Mongoose schemas with built-in validation logic. This ensures that data stored in MongoDB via Mongoose adheres to specified formats and rules, improving data integrity and reliability of the application.

## Objectives
- Learn to define Mongoose schemas with validation rules.
- Use validation to enforce correct data types and formats.
- Handle validation errors and provide meaningful feedback to the client.

## Technologies Used
- Node.js
- Express.js
- Mongoose
- MongoDB

## Getting Started
To get started with this lab, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd lab4-users-database
npm install
Make sure you have MongoDB running locally or set up a remote instance and configure the connection string in your .env file.

## Mongoose Schemas
In this lab, we define user and restaurant schemas with the following fields and validation rules:

## User Schema
username: Required, at least 4 characters.
email: Required, must be a valid email format.
city: Required, must contain only letters and spaces.
website: Required, must be a valid URL.
zipCode: Required, must follow the format 12345-6789.
phone: Required, must follow the format 1-234-567-8910.
## Restaurant Schema
name: Required.
address: Embedded document with street, suite, city, and zipcode.
cuisine: Required.
restaurant_id: Unique identifier for the restaurant.

## API Endpoints
The following endpoints are available:

GET /users: Retrieve all users.

POST /users: Create a new user with validation.

GET /users/:id: Retrieve a user by ID.

PUT /users/:id: Update a user by ID, preserving the unique id.

DELETE /users/:id: Delete a user by ID.

GET /restaurants: Retrieve all restaurants.

POST /restaurants: Create a new restaurant with validation.

## Running the Application
To start the application, run:

bash
Copy code
npm start
The server will start on http://localhost:3000.

## Testing
To test the API endpoints, you can use Postman or any other API testing tool. Make sure to include the necessary JSON payload for POST and PUT requests and set the Content-Type header to application/json.

## Contributors
Rauny Martinelli

## License
This project is licensed under the MIT License.

vbnet
Copy code

Replace `[Your Name]` with your actual name, and `<repository-url>` with the UR