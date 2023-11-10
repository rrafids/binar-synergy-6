import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { User } from '../models/entity/user';
import { UserRequest } from '../models/dto/user';
import UsersService from '../services/users';

class UsersHandler {
  async getUsers(req: Request, res: Response) {
    const queryName: string = req.query.name as string;

    const userList: User[] = await UsersService.getUsers(queryName);

    const response: DefaultResponse = {
      status: 'OK',
      message: 'Success retrieving data',
      data: {
        users: userList,
      },
    };

    res.status(200).send(response);
  }

  async createUser(req: Request, res: Response) {
    const payload: UserRequest = req.body;

    // Multiple files
    (req.files as Express.Multer.File[]).map((file) => {
      payload.profile_picture_file = file;
    });

    // Single file
    // payload.profile_picture_file = req.file;

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

    const createdUser: User = await UsersService.createUser(payload);

    const response: DefaultResponse = {
      status: 'CREATED',
      message: 'User succesfully created',
      data: {
        created_user: createdUser,
      },
    };

    res.status(201).send(response);
  }
}

export default UsersHandler;
