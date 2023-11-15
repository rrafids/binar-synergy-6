import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { LoginRequest, RegisterRequest } from '../models/dto/auth';
import AuthService from '../services/auth';
import { ErrorResponse } from '../models/entity/default';
import { isErrorType } from '../utils/checker';

class AuthHandler {
  async login(req: Request, res: Response) {
    const payload: LoginRequest = req.body;

    // Payload validation
    if (!payload.email) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Email cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    if (!payload.password) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Password cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    const accessToken: string = await AuthService.login(payload);

    const response: DefaultResponse = {
      status: 'OK',
      message: 'User logged in succesfully',
      data: {
        access_token: accessToken,
      },
    };

    res.status(200).send(response);
  }

  async register(req: Request, res: Response) {
    const payload: RegisterRequest = req.body;

    // Payload validation
    if (!payload.email) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Email cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

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

    if (!payload.password) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Password cannot be empty',
        data: {
          created_user: null,
        },
      };

      res.status(400).send(response);
    }

    const registeredUser = await AuthService.register(payload);

    if (isErrorType(registeredUser)) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: registeredUser.message,
        data: null,
      };

      res.status(registeredUser.httpCode).send(response);
    } else {
      const response: DefaultResponse = {
        status: 'CREATED',
        message: 'User registered succesfully',
        data: {
          registered_user: registeredUser,
        },
      };

      res.status(201).send(response);
    }
  }
}

export default AuthHandler;
