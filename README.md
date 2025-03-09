# Spirit11

Spirit11 is a web application built with React frontend and Spring Boot backend, using MongoDB as the database.

## Project Structure

- `frontend/` - React application built with Vite
- `TechBuds/` - Spring Boot backend application

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Java JDK 17 or higher
- Maven
- MongoDB account

### Backend Setup

1. Navigate to the TechBuds directory:
   ```
   cd TechBuds
   ```

2. Build the Spring Boot application:
   ```
   ./mvnw clean install
   ```
   (For Windows, use `mvnw.cmd` instead)

3. Run the backend server:
   ```
   ./mvnw spring:boot:run
   ```
   The backend server will start on http://localhost:8080

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The frontend will be accessible at http://localhost:5173

## Database Setup

The application uses MongoDB Atlas as the database. The connection string is:
```
mongodb+srv://root:ASDfgh1234@cluster0.7vhw3.mongodb.net/
```


## Assumptions Made During Development

- Users have access to MongoDB Atlas
- The application requires an internet connection for database operations
- Chromium browsers are used to access the web application
- Environment variables will be set up for production deployment

## Additional Features

- React-based SPA frontend with Vite for fast development
- Spring Boot backend for robust API development
- MongoDB Atlas integration for cloud-based database storage

## Future Improvements

- Implement user authentication and authorization
- Add comprehensive test coverage
- Create deployment pipelines for CI/CD
- Improve error handling and logging
- Add detailed API documentation
