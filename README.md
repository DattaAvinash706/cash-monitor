CASH MONITOR – Full Stack Expense Tracker

This project is a full-stack expense tracking application built with React (Create-React-App), Node.js, Express, and MySQL.
It allows users to register, log in, add expenses, categorize them, and track budgets.

This README provides clear steps to set up the project on any system.

Project Structure
assignment/
│
├── backend/
│ ├── Middleware/
│ ├── node_modules/
│ ├── .env
│ ├── db.js
│ ├── server.js
│ ├── package.json
│ └── package-lock.json
│
└── expense_tracker/
├── node_modules/
├── public/
├── src/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── services/
│ ├── utils/
│ ├── App.js
│ └── index.js
├── package.json
└── package-lock.json

1. Requirements

Install the following before running the project:

Node.js (Latest LTS recommended)

MySQL Server

Git

2. Setting Up the Database

Open your MySQL terminal or phpMyAdmin and create the database:

a) CREATE DATABASE myapp;

b) Create the required tables

users table

//create a table of users and user_expenses

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255),
password VARCHAR(255)
);

user_expenses table

CREATE TABLE user_expenses (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
amount DECIMAL(10,2),
category VARCHAR(50),
date DATE,
budget DECIMAL(10,2),
FOREIGN KEY (user_id) REFERENCES users(id)
);

3. Backend Setup

Navigate to the backend folder:

cd assignment/backend

Install dependencies:

npm install

Create a .env file inside the backend folder and add:

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=myapp
DB_PORT=3306
JWT_TOKEN=your_secret_key

Start the backend:

npm start

The backend will run at:

http://localhost:4000

4. Frontend Setup

Navigate to the frontend folder:

cd assignment/expense_tracker

Install dependencies:

npm install

Create a .env file inside the expense_tracker folder:

REACT_APP_API_URL=http://localhost:4000

Start the frontend:

npm start

The React app will run at:

http://localhost:3000

5. How the Application Works

Users register and log in.

After logging in, users can add expenses.

Each expense has:

amount

category

date

budget (optional)

All data is stored in the MySQL database.

The dashboard displays total expenses and summaries.

6. Notes for Developers

Do not upload .env files to GitHub.

Ensure MySQL is running before starting the backend.

If the backend fails to connect, verify DB_USER, DB_PASSWORD, and DB_PORT.

After cloning the project, both frontend and backend require npm install.

7. Troubleshooting

Backend crashes on start

Check .env file values

Ensure database myapp exists

Ensure MySQL service is running

Frontend cannot fetch data

Make sure backend is running at http://localhost:4000

Check REACT_APP_API_URL in the frontend .env

CORS errors
Add this in backend if not present:

const cors = require("cors");
app.use(cors());

8. Running the Project Together

Open Terminal 1 → start MySQL

Open Terminal 2 → run backend

Open Terminal 3 → run frontend

The application will then function normally.
