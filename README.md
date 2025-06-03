# Bank Deposits Comparison System

**Project Overview

This project is a web application designed to help users compare bank deposit offers and calculate potential earnings based on interest rates. The system allows users to log in, register, view a list of banks sorted by interest rate, and calculate deposit returns. It was developed as part of an academic assignment by Juri Goldman and Artur Grigorjan.

**Features

User authentication (login and registration).
Display of active banks with sorting by interest rate.
Deposit calculation based on user input and bank interest rates.
Responsive and user-friendly interface using Material-UI.
Backend API for managing bank data and user accounts.

**Technologies Used

Frontend: React, Material-UI, Redux
Backend: NestJS, MongoDB, Mongoose
Version Control: Git, GitHub
Build Tools: TypeScript, Node.js

**Installation and Setup

***Prerequisites

Node.js (version 14.x or later)
MongoDB (local or remote instance)
Git

***Steps

Clone the Repository
git clone https://github.com/jurigoldman/bank-deposits.git
cd bank-deposits


***Install Dependencies

For the frontend:cd frontend
npm install


For the backend:cd ../backend
npm install




***Configure Environment

Create a .env file in the backend directory with the following variables:MONGO_URI=mongodb://localhost:27017/bank_deposits
PORT=3000
JWT_SECRET=your-secret-key


Ensure MongoDB is running locally or update the MONGO_URI to your remote database.


***Run the Application

Start the backend:cd backend
npm run start:dev


Start the frontend:cd ../frontend
npm start


Open your browser and navigate to http://localhost:3000.



**Usage

Login: Use the login page to access the system with your credentials.
Register: New users can register via the registration form.
Compare Banks: View the list of banks and sort by interest rate.
Calculate Deposits: Input the amount and term to see calculated interest based on the selected bank.

**Project Structure

backend/: Contains the NestJS server, API routes, and MongoDB schemas.
frontend/: Contains the React application with components and UI logic.
dist/: Build artifacts (ignored in version control).
node_modules/: Dependencies (ignored in version control).

**Team

Juri Goldman: Project lead, frontend development.
Artur Grigorjan: Backend development, database design.

**Issues and Limitations

Initial login issues were encountered but have been resolved.
The system currently supports a limited number of bank records.
No advanced filtering or user profile features yet.

**Future Improvements

Add more bank details (e.g., terms, conditions).
Implement advanced filtering options.
Introduce user profiles and deposit history.

**License

This project is for educational purposes only and is not licensed for commercial use. Feel free to fork and modify for learning purposes.

**Acknowledgments

We thank our instructor for guidance and support throughout the development process.
