import express, { Application, Request, Response } from 'express';
import { DefaultResponse } from './models/dto/default';
import listUser from './data/users.json';
import { User } from './models/entity/user';

const app: Application = express();
const PORT: number = 8081;

// TODO: Endpoint Get List User
// Change response into new structure
// {
//   "id": 1,
//   "name": "arras",
//   "profile_photo_url": "URL_FROM_CLOUDINARY" // This is the additional data
// }
app.get('/api/users', (req: Request, res: Response) => {
  const nameQuery: string = req.query.name as string;

  const response: DefaultResponse = {
    status: 'OK',
    message: 'Success retrieving data',
    data: {
      users: listUser
        .map((user: User) => ({
          id: user.id,
          name: user.name || '',
        }))
        .filter((user: User) =>
          user.name?.toLowerCase().includes(nameQuery.toLowerCase())
        ),
    },
  };

  res.status(200).send(response);
});

// TODO: Endpoint Get User by Id

// TODO: Endpoint Create User
// Create an endpoint for creating user data
// Also need to integrate with cloudinary (please check in PPT)
// What you need to store:
// {
//   "id": 1,
//   "name": "arras",
//   "profile_photo_url": "URL_FROM_CLOUDINARY" // This is the additional data
// }
// Please makesure you can get values from form data

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
