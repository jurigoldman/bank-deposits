# Bank Deposit Management System

## Description

This NestJS-based application is a system for managing bank deposits. It allows users to register, log in, and view available deposits. Administrators can add new deposit types.

## Technologies

- **Framework:** NestJS
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Class-validator, Class-transformer
- **API Documentation:** Swagger

## Installing Dependencies

```bash
$ npm install
```

## Running the Application

### Development Mode

```bash
# Start with automatic restart on changes
$ npm run start:dev
```

### Production Mode

```bash
# Build the project
$ npm run build

# Run the built application
$ npm run start:prod
```

The application will be available at `http://localhost:3000` (or another port specified in the configuration).

## Testing

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Tests with code coverage
$ npm run test:cov
```

## Database Structure

### `users` Collection

- `email` (String, required, unique): User's email.
- `password` (String, required): Hashed user password.
- `role` (String, enum: ['user', 'admin'], default: 'user'): User role.

### `deposits` Collection

- `name` (String, required): Deposit name.
- `interestRate` (Number, required): Interest rate.
- `durationMonths` (Number, required): Deposit term in months.

## API Endpoints

API documentation is available at `/api` after starting the application (Swagger UI).

### Authentication (`/auth`)

- `POST /auth/register`: Register a new user.
  - **Request Body:** `{ "email": "user@example.com", "password": "yourpassword", "role": "user" }` (the `role` field is optional, defaults to 'user')
  - **Response:** Created user data.
- `POST /auth/login`: User login.
  - **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`
  - **Response:** `{ "access_token": "your_jwt_token", "user": { ...user_data } }`

### Deposits (`/deposits`)

- `GET /deposits`: Get a list of all deposits (requires authentication).
  - **Headers:** `Authorization: Bearer your_jwt_token`
  - **Response:** Array of deposit objects.
- `POST /deposits`: Create a new deposit (available only to administrators).
  - **Headers:** `Authorization: Bearer your_jwt_token`
  - **Request Body:** `{ "name": "Deposit Name", "interestRate": 5.5, "durationMonths": 12 }`
  - **Response:** Created deposit data.
- `GET /deposits/compare`: Compare deposits based on criteria (requires authentication).
  - **Headers:** `Authorization: Bearer your_jwt_token`
  - **Query Parameters:** `amount` (Number), `durationMonths` (Number)
  - **Response:** Array of suitable deposit objects.
- `PUT /deposits/:id`: Update an existing deposit (available only to administrators).
  - **Headers:** `Authorization: Bearer your_jwt_token`
  - **Request Body:** `{ "name": "Updated Deposit Name", "interestRate": 6.0, "durationMonths": 18 }` (fields are optional)
  - **Response:** Updated deposit data.

## API Testing

You can use Swagger UI (available at `/api` after launch) or tools like Postman to test the API.

### Example Testing with Postman:

1.  **Registration:** Send a POST request to `/auth/register` with email and password in the request body (JSON).
2.  **Login:** Send a POST request to `/auth/login` with the same email and password. Copy the `access_token` from the response.
3.  **Get Deposits:** Send a GET request to `/deposits`. In the `Authorization` tab, select `Bearer Token` type and paste the copied `access_token`.
4.  **Compare Deposits:** Send a GET request to `/deposits/compare` with `amount` and `durationMonths` as query parameters. Use the `Authorization` header with the Bearer Token.
5.  **Create Deposit (for admin):** If you registered as an administrator (`role: 'admin'`), send a POST request to `/deposits` with deposit data in the body (JSON). Don't forget to add `Authorization: Bearer your_jwt_token`.
6.  **Update Deposit (for admin):** Send a PUT request to `/deposits/:id` (replace `:id` with the actual deposit ID) with the updated fields in the body (JSON). Use the `Authorization` header.

