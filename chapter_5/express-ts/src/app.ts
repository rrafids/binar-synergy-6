import express, { Application } from 'express';
import UsersHandler from './handlers/users';

const app: Application = express();
const PORT: number = 8081;

// Add middleware to get the body from the request
app.use(express.json());

// Init handlers
const usersHandler = new UsersHandler();

// Define routes
app.get('/api/users', usersHandler.getUsers);
app.post('/api/users', usersHandler.createUser);

// TODO: Create endpoint for get user by id
// TODO: Create endpoint for delete user by id

// TODO: Create endpoint for posts resource: create, update, get all, get by id, delete by id
// Attributes: id, title, content, user_id

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
