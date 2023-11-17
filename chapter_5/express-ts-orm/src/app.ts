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

// Swagger
const swaggerSpec = swaggerJsdoc(swaggerConfig);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define routes
// Users
app.get(
  '/api/users',
  AuthMiddleware.authenticate,
  // TODO: add role checking middleware
  usersHandler.getUsers
);
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

// TODO: 17 November 2023
// 1. Create swagger docs for api get list users & create user
// 2. Please add 'role' field for each registration
// User data:
// id, role ('admin' | 'user'), name, email, password, profile_picture_url
// 3. Please add middleware for endpoint get list user for checking user role (please makesure he is an 'admin')

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.APP_PORT}`);
});
