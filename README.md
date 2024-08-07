# moola - Personal Finance Tracker

moola is a personal finance tracker web application designed to help you manage your finances effectively. It consists of a .NET REST API backend, a SQL Server database using Entity Framework, and a Vite React frontend.

![Moola Screenshot](https://github.com/DylanMcCaw/moola/blob/main/FrontEnd/budget-tracker/public/moola-home-screenshot.png)

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Expenses](#expenses)
  - [Finance Calculator](#finance-calculator)
  - [Income](#income)
  - [Savings](#savings)

## Features

- **Track Income, Expenses and Savings:** Easily add and categorise your income and expenses.
- **Dashboard Overview:** View your financial summary on a dynamic dashboard.
- **Secure Authentication:** User authentication to keep your data private and secure.
- **Data Visualization:** Graphs and charts for visualizing your financial data.

## Technologies Used

- **Backend:**
  - **.NET:** Used for building the REST API.
  - **Entity Framework:** ORM for managing database interactions.
  - **SQL Server:** Database for storing all financial data.

- **Frontend:**
  - **Vite:** Fast and optimized build tool for modern web projects.
  - **React:** JavaScript library for building user interfaces.
  - **Mantine:** React component library for building beautiful and functional UIs.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/moola.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd moola
   ```

3. **Set up the backend:**

   - Navigate to the API directory:
     ```bash
     cd backend
     ```
   - Install the .NET dependencies:
     ```bash
     dotnet restore
     ```
   - Update the database using Entity Framework:
     ```bash
     dotnet ef database update
     ```

4. **Set up the frontend:**

   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install the Node.js dependencies:
     ```bash
     npm install
     ```
   - or
     ```bash
     yarn install
     ```

### Running Locally

1. **Start the backend API:**
   ```bash
   dotnet run
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

3. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```


## API Documentation

### Authentication

- **Register:** `POST /api/Authentication/Register`
- **Login:** `POST /api/Authentication/Login`
- **Logout:** `POST /api/Authentication/Logout`

### Expenses

- **Get Expense by ID:** `GET /api/Expense/{id}`
- **Delete Expense:** `DELETE /api/Expense/{id}`
- **Update Expense:** `PUT /api/Expense/{id}`
- **Get Expenses by User ID:** `GET /api/Expense/User/{id}`
- **Add Expense:** `POST /api/Expense`

### Finance Calculator

- **Calculate Payments:** `POST /api/FinanceCalculator/CalculatePayments`

### Income

- **Get Income by ID:** `GET /api/Income/{id}`
- **Delete Income:** `DELETE /api/Income/{id}`
- **Update Income:** `PUT /api/Income/{id}`
- **Get Income by User ID:** `GET /api/Income/User/{id}`
- **Add Income:** `POST /api/Income`

### Savings

- **Get Savings by ID:** `GET /api/Savings/{id}`
- **Delete Savings:** `DELETE /api/Savings/{id}`
- **Update Savings:** `PUT /api/Savings/{id}`
- **Get Savings by User ID:** `GET /api/Savings/User/{id}`
- **Add Savings:** `POST /api/Savings`
- **Deposit into Savings:** `POST /api/Savings/Deposit/{id}`
- **Withdraw from Savings:** `POST /api/Savings/Withdraw/{id}`
- **Get Savings Transactions by User ID:** `GET /api/Savings/User/{userId}/Transactions`

