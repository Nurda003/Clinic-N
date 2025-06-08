# Dental Clinic Project Documentation

## Project Overview

This is a full-stack dental clinic management system built with React.js frontend and Node.js/Express.js backend.

## Technology Stack

### Backend Technologies

1. **Node.js & Express.js**

   - Used as the main server framework
   - Handles API routes and server-side logic
   - Location: `/server/index.js`

2. **MongoDB & Mongoose**

   - Database: MongoDB
   - ODM: Mongoose for MongoDB object modeling
   - Location: `/server/models/`

3. **Authentication & Security**

   - JWT (jsonwebtoken) for authentication
   - bcryptjs for password hashing
   - cookie-parser for handling cookies
   - Location: `/server/middleware/`

4. **File Storage**

   - GridFS for file storage
   - multer for file uploads
   - multer-gridfs-storage for GridFS storage engine
   - Location: `/server/controllers/`

5. **Additional Backend Tools**
   - cors for Cross-Origin Resource Sharing
   - dotenv for environment variables
   - node-cache for caching

### Frontend Technologies

1. **React.js**

   - Main frontend framework
   - Location: `/ds/client/src/`

2. **State Management**

   - Redux for state management
   - react-redux for React bindings
   - redux-thunk for async actions
   - redux-devtools-extension for development
   - Location: `/ds/client/src/redux/`

3. **Routing**

   - react-router-dom for client-side routing
   - Location: `/ds/client/src/App.js`

4. **Styling**

   - Tailwind CSS for styling
   - classnames for conditional class names
   - Location: `/ds/client/src/components/`

5. **HTTP Client**

   - axios for API requests
   - Location: `/ds/client/src/services/`

6. **Date Handling**
   - moment.js for date manipulation
   - tailwind-datepicker-react for date picking
   - Location: `/ds/client/src/components/`

### Development Tools

1. **Code Formatting**

   - Prettier for code formatting
   - Location: `.prettierrc`

2. **Testing**
   - Jest
   - React Testing Library
   - Location: `/ds/client/src/__tests__/`

## Project Structure

```
clinic/
├── server/                 # Backend code
│   ├── controllers/       # Request handlers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── index.js          # Server entry point
│
├── ds/                    # Frontend code
│   └── client/
│       ├── public/       # Static files
│       ├── src/         # React source code
│       │   ├── components/  # React components
│       │   ├── redux/      # Redux store and actions
│       │   ├── services/   # API services
│       │   └── App.js      # Main application component
│       └── package.json    # Frontend dependencies
│
└── package.json           # Root package.json
```

## Key Features

1. User Authentication
2. Patient Management
3. Appointment Scheduling
4. File Storage
5. Real-time Updates
6. Responsive Design

## Development Setup

1. Install dependencies:

   ```bash
   npm install
   cd ds/client && npm install
   ```

2. Start the development servers:
   - Backend: `npm start`
   - Frontend: `cd ds/client && npm start`

## Environment Variables

Create a `.env` file in the server directory with the following variables:

- MONGODB_URI
- JWT_SECRET
- PORT

## API Documentation

The API endpoints are documented in the server routes directory. Each route file contains the available endpoints and their functionality.

## Security Considerations

1. JWT-based authentication
2. Password hashing with bcrypt
3. CORS configuration
4. Environment variable protection
5. Input validation and sanitization

## Performance Optimizations

1. Node-cache for frequently accessed data
2. GridFS for efficient file storage
3. Redux for optimized state management
4. React lazy loading for code splitting

## Testing

The project includes both frontend and backend tests:

- Frontend: Jest and React Testing Library
- Backend: Unit tests for API endpoints

## Deployment

The application is configured for deployment with:

- Heroku postbuild scripts
- Production build optimization
- Environment variable management
