import express, { Application } from 'express';
import UsersHandler from './handlers/users';
import uploadFileUtil from './utils/uploadFileMemory';
import AuthHandler from './handlers/auth';

const app: Application = express();
const PORT: number = 8081;

app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();
const authHandler = new AuthHandler();

// Define routes
// Users
app.get('/api/users', usersHandler.getUsers);
app.post(
  '/api/users',
  // uploadFileUtil.single('profile_picture_url'), // single file
  uploadFileUtil.array('profile_pictures'), // multiple files
  usersHandler.createUser
);

// Auth
app.post('/api/auth/login', authHandler.login);
app.post('/api/auth/register', authHandler.register);

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

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});