# Cubicles
Cubicles is a job portal application that helps job seekers find opportunities and employers post job listings. The project aims to simplify the job search process and provide insights for getting hired faster in the Human Resource Management System (HRMS) domain.

-  Check out our **Live site**: https://cubicles.netlify.app/
-  Swagger documentation available at:  https://motionless-doro-itsaj1005-1b938d2c.koyeb.app/api-docs

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Architecture](#architecture)
   - [Class Diagram](#class-diagram)
   - [Data Flow Diagram (simplified)](#data-flow-diagram-(simplified))
   - [Use case diagrams](#use-case-diagrams)
   - [State diagram](#state-diagram)
5. [File structure](#directory-structure)
6. [API Documentation](#cubicles-api-documentation)
6. [Installation & Setup](#installation-and-setup-guide)
7. [Logging & Monitoring](#logging-and-monitoring)
8. [Testing](#testing)
9. [Security](#security-and-authentication)
10. [Contribution Guidelines](#contribution-guidelines-for-cubicles)
11. [Team Details](#cubicles-team-details)
12. [Conclusion](#conclusion) 

---

## Overview
Cubicles is an innovative job portal designed to bridge the gap between job seekers and employers. It offers a user-friendly platform where candidates can browse and search for job opportunities while employers can easily post and manage job listings. 

The application simplifies the recruitment process by providing:

- **Comprehensive Job Listings:** Users can filter and search through a wide range of job opportunities.
- **Detailed Insights:** Tips, resources, and analytics to help candidates improve their chances of getting hired.
- **Educational Content:** Learn pages that provide updates on market trends and career development.
- **Multi-User Support:** Tailored experiences for regular users, admins/recruiters, and superusers, including advanced features like charts and report generation.
- **Community Engagement:** A blog and community section where users can create, share, and manage their own content.

Built on a modern tech stack and following industry best practices, Cubicles is designed for scalability and maintainability, ensuring it can evolve with the needs of both job seekers and employers.

---

## Features
- **User Authentication:** Secure registration, login, and token-based sessions using JWT.
- **Role-Based Access Control (RBAC):** Different access levels for users, admins, and superusers.
- **CRUD Operations:** Full support for creating, reading, updating, and deleting domain entities.
- **Beautiful UI:**  Design built with React and Tailwind CSS.
- **Analytics & Reporting:** Dashboards and reports for data-driven insights.
- **Third-Party Integrations:** Payment gateways, social logins, email notifications, etc.

---

# Tech Stack

### Frontend:

Cubicles’ frontend is built with modern tools and libraries that ensure a fast, responsive, and highly interactive user interface.
- **React** – The core library for building dynamic user interfaces.
- **Vite** – Fast development server and build tool.
- **Tailwind CSS & tailwindcss-animate** – Utility-first CSS framework for rapid UI development.
- **@emotion/react & @emotion/styled** – CSS-in-JS solution for styling components.
- **Material UI**
- **Radix UI Libraries** – For accessible and customizable UI primitives.
- **AOS (Animate On Scroll)** – Animates elements on scroll.
- **Framer Motion** – For advanced animations and transitions.
- **Chart Libraries:**
  - `chart.js`
  - `react-chartjs-2`
  - `recharts`
- **React Circular Progressbar** – Visual progress indicators.
- **Redux & @reduxjs/toolkit** – For state management.
- **Redux Persist** – To persist state across sessions.
- **React Router DOM** – For client-side routing.
- **Axios** – For making HTTP requests.
- **Sonner** – For toast notifications.
- **CLS (clsx & tailwind-merge)** – For managing CSS class names.
- **Cloudinary React** – For handling media assets from Cloudinary.
- Additional libraries like `cmdk`, `embla-carousel-react`, and `lucide-react` enhance UI/UX features.


## Backend Tech Stack:

The backend of Cubicles is built on Node.js with Express.js, ensuring a robust API and secure, scalable services.

### Runtime & Framework
- **Node.js & Express.js** – For building RESTful APIs.
- **Nodemon** – For auto-restarting the server during development.

### Database
- **MongoDB** – NoSQL database for storing application data.
- **Mongoose** – For modeling and interacting with MongoDB.

### Authentication & Security
- **jsonwebtoken (JWT)** – For secure token-based authentication.
- **bcryptjs** – For password hashing.
- **Helmet** – For setting secure HTTP headers.
- **CORS** & **cookie-parser** – For managing cross-origin resource sharing and cookies.
- **express-rate-limit** - For rate limiting.
### File Upload & Cloud Integration
- **Multer & multer-storage-cloudinary** – For handling file uploads and integrating with Cloudinary.
- **Cloudinary** – For managing and storing media files.

### Utilities & Other Libraries
- **dotenv** – For environment variable management.
- **moment** – For date manipulation.
- **datauri** – To work with file data as URI strings.
- **Nodemailer** – For sending emails.
- **pdfkit** – For generating PDF documents.


---

## Architecture
The architecture of Cubicles is designed to deliver a maintainable, and robust job portal solution. Leveraging modern technologies and Domain-Driven Design (DDD) principles, the system is structured to separate business logic from infrastructure concerns while ensuring smooth communication between components.

### Class Diagram:
![Cubicles Class Diagram](https://raw.githubusercontent.com/Cubicles2024/Cubicals-main/main/Architectural%20Diagrams/Class%20diagram.png)
### Data Flow Diagram (simplified):
![Cubicles Class Diagram](https://raw.githubusercontent.com/Cubicles2024/Cubicals-main/main/Architectural%20Diagrams/Data%20flow%20diagram%20(DFD).png)
### Use case diagrams:
<img src="https://raw.githubusercontent.com/Cubicles2024/Cubicals-main/main/Architectural%20Diagrams/useCase-1.png" height="1000">
<img src="https://raw.githubusercontent.com/Cubicles2024/Cubicals-main/main/Architectural%20Diagrams/useCase-2.png" height="400">

### State diagrams (simplified):
<img src="https://raw.githubusercontent.com/Cubicles2024/Cubicals-main/main/Architectural%20Diagrams/State%20diagram.png" height="1200">

### Bounded Contexts
1. **User Management:** Manages user profiles, authentication, and authorization.
2. **Product/Service Management:** Handles data and logic for core business entities.
3. **Order/Transaction Processing:** Manages orders, payments, and transactions.
4. **Reporting & Analytics:** Generates reports and dashboards for actionable insights.

### Directory Structure
Below is a backend directory layout that illustrates the separation of concerns:

```sh
backend/ 
├── controllers/ 
│   ├── application.controller.js 
│   ├── company.controller.js 
│   ├── job.controller.js 
│   └── user.controller.js 
├── middleware/ 
│   ├── isAuthenticated.js 
│   ├── errorHandler.js
│   ├── mailer.js 
│   └── multer.js 
├── models/ 
│   ├── application.model.js 
│   ├── company.model.js 
│   ├── job.model.js 
│   └── user.model.js 
├── routes/ 
│   ├── application.route.js 
│   ├── company.route.js 
│   ├── job.route.js 
│   └── user.route.js 
├── utils/ 
│   ├── cloudinary.js 
│   ├── datauri.js 
│   ├── rate-limiting.js 
│   └── db.js 
├── logs/
├── app.js 
├── package.json 
├── routes-data.md
├── README.md 
└── .env
```
---
## Cubicles API Documentation

This document details the API endpoints available in the Cubicles job portal application. Please find the api documentation of Cubicles here:

[View Full API Documentation](./backend/route-api-doc.md)

**For Swagger API documentation & visualization:**
Run backend server then open this in the browser:
```
http://localhost:3000/api-docs/
```


# Installation and Setup Guide

## Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Git
- MongoDB (installed and running locally or access to MongoDB Atlas)

## Project Setup

### 1. Clone the Repository
```bash
# Clone the repository
git clone https://github.com/Cubicles2024/Cubicals-main.git

# Navigate to the project directory
cd Cubicles
```
If you received the project as a zip file named `Cubicles-main.zip`, extract it and then:
```bash
cd Cubicles-main
```

### 2. Environment Configuration

#### Backend Configuration
```bash
# Navigate to the backend directory
cd backend

# Create environment file
cp .env.example .env
```
Open the .env file and configure your environment variables by pasting this:
```bash
MONGODB_URI=mongo_uri
SECRET_KEY==your_JWT_secret_key
CLOUD_NAME=your_cloud_name_cloudinary
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
CLOUDINARY_URL=your_cloudinary_url
```

### 3. Install Dependencies

#### Backend Dependencies
```bash
# Navigate to the backend directory if you're not already there
cd backend

# Install backend dependencies
npm install

# If you encounter any dependency errors, try:
npm install --legacy-peer-deps
```

#### Frontend Dependencies
```bash
# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# If you encounter any dependency errors, try:
npm install --legacy-peer-deps
```

### 4. Database Setup
```bash
# Ensure MongoDB is running locally
# If using MongoDB Atlas, make sure your connection string in .env is correct
```

## Starting the Application

### 1. Start Backend Server
```bash
# In the backend directory
cd backend

# Start development server
npm run dev

# The server should start on port 3000 (or the port specified in your .env)
# You should see a message like: "Server running on port 3000"
# Database connection message: "Connected to MongoDB successfully"
```

### 2. Start Frontend Application
```bash
# Open a new terminal window/tab
# Navigate to the frontend directory
cd frontend

# Start the development server
npm run dev

# You should see a message with the local URL, typically:
# "Local: http://localhost:5173/"
```

### 3. Access the Application
- Open your web browser and navigate to: `http://localhost:5173/`
- You should see the Cubicles job portal application login page

## Super User Setup

The super user has administrative privileges across the entire application.

### Creating a Super User
```bash
# Navigate to the backend directory
cd backend

# Run the super user creation script
node createSuperUser.js

# You will be prompted to enter:
# - Email
# - Password
# - Name
# Or these details might be preset in the script

# Upon success, you should see: "Super User created successfully"
```

### Accessing Super User Dashboard
1. Go to `http://localhost:5173/supreme` in your browser
2. Login with the super user credentials you created
3. You will be redirected to the super admin dashboard

## Troubleshooting

### Common Issues:

1. **Backend won't start:**
   - Check MongoDB connection
   - Verify all environment variables are set correctly
   - Check for port conflicts (something else might be using port 3000)

2. **Frontend won't start:**
   - Check for Node.js version compatibility
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

3. **API Connection Errors:**
   - Ensure backend is running
   - Check CORS configuration in backend
   - Verify API URL in frontend .env file

4. **Login Issues:**
   - Check if JWT secret is properly set
   - Verify user exists in database
   - Check browser console for errors

## Additional Commands

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Building for Production
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Database Backup
```bash
# From project root
cd backend
npm run db:backup
```
---

## Logging and monitoring
- **Logging:** Use Winston and Morgan for structured logging.
---
## Testing 
### Frontend:
[https://github.com/Cubicles2024/Cubicals-main/tree/main/frontend/reports]()
### Backend: 
[https://github.com/Cubicles2024/Cubicals-main/blob/main/backend/__tests__/Readme.md]()

---
## Security And Authentication
- **JWT Authentication:** Secure token-based authentication.
- **Helmet:** Added to enhance security by setting various HTTP headers.
- **HTTPS:** Enforced in production with Nginx as a reverse proxy.
- **Rate Limiting:** Configured to mitigate brute-force attacks.
- **CORS:** Properly configured to allow requests from trusted origins.
---


## Contribution Guidelines for Cubicles

Thank you for your interest in contributing to Cubicles! We welcome contributions that improve the project. Please follow these guidelines to ensure a smooth collaboration.

### Getting Started
1. **Fork the Repository**: Start by forking the repository to your GitHub account.
2. **Clone the Repository**: Clone the forked repository to your local machine using:
   ```sh
   git clone https://github.com/your-username/cubicles.git
   ```
3. **Install Dependencies**: Run the following command to install all required dependencies:
   ```sh
   npm install
   ```
4. **Create a New Branch**: For new features or bug fixes, create a branch:
   ```sh
   git checkout -b feature-name
   ```

### Code Guidelines
- **Write Tests**: Ensure new features and bug fixes are covered with tests.
- **Keep Commits Atomic**: Write clear and concise commit messages following the conventional commit format:
  ```sh
  git commit -m "feat: add new job filtering logic"
  ```

### Submitting a Pull Request
1. **Push Your Changes**: Push the branch to your forked repository:
   ```sh
   git push origin feature-name
   ```
2. **Open a Pull Request (PR)**:
   - Go to the main repository on GitHub.
   - Click "New Pull Request" and select your branch.
   - Provide a clear description of your changes.
   - Link any related issues (if applicable).
3. **Wait for Review**: A maintainer will review your PR, request changes if needed, and merge it once approved.

### Reporting Issues
If you encounter a bug or have a feature request, please [open an issue](https://github.com/your-username/cubicles/issues) with details.

### Code of Conduct
All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful and inclusive environment.

We appreciate your contributions and efforts to improve Cubicles! 🚀

---

## Cubicles team details:
- **Group ID:** 18
- **Group Title:** Cubicles

#### Group Member Details

1. **Name:** Alagadapa Jaya Harsh Vardhan  
   **Roll Number:** S20220010011

2. **Name:** Srikar Chaturvedula  
   **Roll Number:** S20220010207

3. **Name:** Ayush Singhai  
   **Roll Number:** S20220010024

4. **Name:** Gadigala Varun Tyagarayan  
   **Roll Number:** S20220010070

5. **Name:** Abhinav Chukka  
   **Roll Number:** S20220010052

## Conclusion:
Your contributions help make Cubicles better! Whether you're fixing a bug, adding a feature, or improving documentation, we appreciate your efforts. Thank you for being a part of our community and helping us grow. 🚀

