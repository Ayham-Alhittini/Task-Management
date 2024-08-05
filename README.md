# Task Manager

## Introduction
This is a simple task management application built with the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, read, update, and delete tasks with user authentication. The application features a responsive user interface, form validation, and error handling. 

For detailed usage documentation, please refer to the [user guide](https://scribehow.com/shared/Create_account_and_manage_tasks_tutorial__RTm5KaA1SGWlBXM7Cs09cA).

![Authentication Background](https://atypon-task-management.s3.eu-north-1.amazonaws.com/auth-background.jpg)

## Key Features
- **User Authentication**: Sign up, log in, and log out with secure password hashing and session management using JWT & Short lived token with refresh token.
- **Task Management**: Create, view, update, and delete tasks. Tasks are associated with the user who created them.
- **Responsive Frontend**: Built with React hooks and functional components.
- **RESTful API**: Backend built with Node.js to handle CRUD operations for tasks and user authentication.
- **Database**: MongoDB is used to store user and task data.
- **Testing**: Unit and integration tests for API endpoints.

## Setup

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayham-Alhittini/Task-Management.git
   cd Task-Management
2. Install dependencies and start the server:
   ```bash
   cd server
   npm install
   npm start
3. Install dependencies and start the client:
   ```bash
   cd client
   npm install
   npm start

### Running Tests
   Server Tests

1. To run all server tests:
   ```bash
      npm test
2. To run authentication tests:
   ```bash
   npm run test:auth
3. To run task management tests:
   ```bash
   npm run test:task

   
### Technologies Used
* Frontend
React,
Context API,
MUI,
Formik

* Backend
Node.js,
Express

* Database
MongoDB

* Authentication
JWT (JSON Web Tokens)

* Testing
Jest,
Supertest