import { NextFunction, Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { UserRequest } from '../models/dto/user';

class AuthMiddleware {
  isAdmin(req: Request, res: Response, next: NextFunction) {
    const payload: UserRequest = req.body;

    if (payload.role === 'admin') {
      next();
    }

    const response: DefaultResponse = {
      status: 'UNAUTHORIZED',
      message: 'Role should be admin',
      data: null,
    };

    res.status(401).send(response);
  }
}

export default AuthMiddleware;
