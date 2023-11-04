import express, { Application, NextFunction, Request, Response } from 'express';
import UsersHandler from './handlers/users';
import AuthMiddleware from './middlewares/auth';
import uploadFileUtil from './utils/uploadFile';
// import formData from 'express-form-data';

const app: Application = express();
const PORT: number = 8081;

// Add middleware to get the body from the request
// app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();

// Init Middlewares
// const authMiddleware = new AuthMiddleware();

// Define routes
app.get('/api/users', usersHandler.getUsers);
app.post(
  '/api/users',
  // authMiddleware.isAdmin,
  uploadFileUtil.single('profile_picture_url'),
  usersHandler.createUser
);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
