# Osumare Backend Assignment – Task Management API

A simple RESTful API built with **Node.js** and **Express.js** for managing tasks and user authentication. JWT is used for secure access token generation, and cookies are used for storing the token on the client side.

-----

## Tech Stack & Libraries

- Node.js
- Express.js
- JWT (jsonwebtoken)
- cookie-parser
- dotenv

-----

## Features

- Full **CRUD** functionality for managing tasks
- **User Authentication** using **JWT** tokens
- Access token stored in **HTTP-only cookie**
- Middleware-protected routes
- In-memory data storage (no database)
- Error handling and validation
- Tested using Postman

-----

## API Endpoints

### Public Task Routes

| Method | Endpoint           | Description            |
|--------|--------------------|------------------------|
| GET    | `/api/tasks`       | Get all tasks          |
| GET    | `/api/tasks/:id`   | Get a task by ID       |



### Protected Task Routes (Require JWT accessToken in cookies)

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | `/api/tasks`       | Create a new task       |
| PUT    | `/api/tasks/:id`   | Update a task by ID     |
| DELETE | `/api/tasks/:id`   | Delete a task by ID     |



## Authentication Routes

| Method | Endpoint               | Description                |
|--------|------------------------|----------------------------|
| POST   | `/api/auth/signup`     | Register a new user        |
| POST   | `/api/auth/login`      | Log in and receive JWT     |
| POST   | `/api/auth/logout`     | Clear access token cookie  |
| GET    | `/api/auth/getAllUsers`| Get all registered users (for testing purpose)  |

-----

## JWT-Based Authentication

- When a user logs in or signs up, a **JWT token** is generated using their `userId`.
- The token is signed with `process.env.JWT_SECRET` and has a validity of **7 days**.
- It is stored in an **HTTP-only, SameSite Strict** cookie to enhance security.

### Token Cookie Properties

| Property     | Value       |
|--------------|-------------|
| Name         | `accessToken` |
| `maxAge`      | 7 days       |
| `httpOnly`   | true         |
| `secure`     | false (for local testing) |
| `sameSite`   | strict       |

-----

## Middleware Protection

All protected routes use the following middleware:

```js
export const protectedRoute = (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(400).json({ message: "Access Token Required" });
  next();
};
```

-----

# Sample Auth Requests

### Signup

**POST** `/api/auth/signup`  

```json
{
  "name": "Raj Singh",
  "email": "raj@example.com",
  "password": "123456"
}
```

### Login

**POST** `/api/auth/login`  

```json
{
  "email": "raj@example.com",
  "password": "123456"
}
```

### Logout

- Requires accessToken to be present in the cookies

**POST** `/api/auth/logout`

-----

## How to Run Locally

Follow these steps to run the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/Ad-cmd-1976/Osumare-Backend-Assignment.git
cd osumare-backend-assignment
```

### 2. Install Dependencies

```bash
npm install
```
### 3. Set Environment Variables

- JWT_SECRET=secret-123
- PORT=8080

### 4. Start The Server

```bash
npm run start
```

-----

## Submission

- This project is submitted for **backend evaluation** at **Osumare Marketing Solutions**.
- **Submitted** by: Aditya Vishwakarma
- **Github Link:**[Click Here to view repository](https://github.com/Ad-cmd-1976/Osumare-Backend-Assignment/tree/main)