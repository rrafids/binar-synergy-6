import express, { Application } from 'express';
import UsersHandler from './handlers/users';
import uploadFileUtil from './utils/uploadFileMemory';
import AuthHandler from './handlers/auth';
import AuthMiddleware from './middlewares/auth';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerConfig } from './utils/swaggerOption';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();

// Define routes

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Users
app.get('/api/users', AuthMiddleware.authenticate, usersHandler.getUsers);
app.post(
  '/api/users',
  // uploadFileUtil.single('profile_picture_url'), // single file
  uploadFileUtil.array('profile_pictures'), // multiple files
  usersHandler.createUser
);

// Auth
app.post('/api/auth/register', authHandler.register);
app.post('/api/auth/login', authHandler.login);
app.get(
  '/api/auth/me',
  AuthMiddleware.authenticate,
  authHandler.getLoggedInUser
);

// TODO:
// -- Users
// 1. Delete user by id endpoint
// 2. Get user by id endpoint

// -- Categories
// 1. Create category
// 2. Get all categories

// -- Tweets
// 1. Create tweet
//  -> Create tweet_categories
// 2. Get all tweets
//  -> response // opsional
// {
//   "id",
//   "content",
//   "user"
//    ->
//    {
//       "id",
//       "name"
//    }
//   "categories" -> ['category_name']
// }

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
