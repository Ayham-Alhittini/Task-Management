# Task Manager MERN Application

## Introduction
This is a simple task management application built with the MERN (MongoDB, Express, React, Node.js) stack. It allows users to create, read, update, and delete tasks with user authentication. The application features a responsive user interface, form validation, and error handling. 

![Authentication Background](https://atypon-task-management.s3.eu-north-1.amazonaws.com/auth-background.jpg)

### Key Features:
- User Authentication: Sign up, log in, and log out with secure password hashing and session management using JWT.
- Task Management: Create, view, update, and delete tasks. Tasks are associated with the user who created them.
- Responsive Frontend: Built with React hooks and functional components.
- RESTful API: Backend built with Node.js to handle CRUD operations for tasks and user authentication.
- Database: MongoDB is used to store user and task data.
- Testing: Unit and integration tests for API endpoints.

## Setup

### Prerequisites
- Ensure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ayham-Alhittini/Task-Management.git
   cd Task-Management
2. Install dependencies and start the server:
cd server
`npm i && 
npm start`

3. Install dependencies and start the client:
cd client
`npm i && 
npm start`

### Running Tests For Server
npm test

To run authentication tests:
npm run test:auth

To run task management tests:
npm run test:task


### Usage

1.Sign up for a new account.

2.Log in with your credentials.

3.Create a new task.

4.View your tasks.

5.Update or delete tasks.



### Technologies Used
Frontend: React, Context API for state management, MUI, Formik

Backend: Node.js, Express

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

Testing: Jest, Supertest





