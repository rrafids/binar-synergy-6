import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { User } from '../models/entity/user';
import listUser from '../../data/users.json';
import { UserRequest } from '../models/dto/user';
import fs from 'fs';

class UsersHandler {
  async getUsers(req: Request, res: Response) {
    const nameQuery: string = req.query.name as string;

    let filteredUsers: User[] = listUser.map((user: User) => ({
      id: user.id,
      name: user.name || '',
    }));

    if (nameQuery) {
      filteredUsers = filteredUsers.filter((user: User) =>
        user.name?.toLowerCase().includes(nameQuery.toLowerCase())
      );
    }

    const response: DefaultResponse = {
      status: 'OK',
      message: 'Success retrieving data',
      data: {
        users: filteredUsers,
      },
    };

    res.status(200).send(response);
  }

  async createUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;
    payload.profile_picture_url = (req as any)['uploaded_profile_picture_url'];

    // Payload validation
    if (!payload.name) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Name cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    const userToCreate: User = {
      id: listUser[listUser.length - 1].id + 1,
      name: payload.name,
      profilePictureUrl: payload.profile_picture_url,
    };

    const users: User[] = listUser;
    users.push(userToCreate);

    fs.writeFileSync('./data/users.json', JSON.stringify(users));

    const response: DefaultResponse = {
      status: 'CREATED',
      message: 'User succesfully created',
      data: {
        created_user: userToCreate,
      },
    };

    res.status(201).send(response);
  }
}

export default UsersHandler;
