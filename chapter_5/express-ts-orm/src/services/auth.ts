import { LoginRequest, RegisterRequest } from '../models/dto/auth';
import { Auth } from '../models/entity/auth';
import { ErrorResponse } from '../models/entity/default';
import { User } from '../models/entity/user';
import UsersRepository from '../repositories/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUND = 10;

class AuthService {
  static async login(req: LoginRequest): Promise<Auth | ErrorResponse> {
    try {
      // Validate fields existence
      if (!req.email) throw new Error('email cannot be empty');
      if (!req.password) throw new Error('password cannot be empty');
      if (req.password.length < 8)
        throw new Error('password length should be more than 8');

      // Check if email is exist
      const user = await UsersRepository.getUserByEmail(req.email);

      if (!user) {
        throw new Error("user doesn't exist");
      }

      // Check if password is correct
      const isPasswordCorrect = bcrypt.compareSync(
        req.password,
        user.password as string
      );

      if (!isPasswordCorrect) {
        throw new Error('wrong password');
      }

      // Generate token JWT
      const jwtSecret = 'SECRET';
      const jwtExpireTime = '24h';

      const accessToken = jwt.sign(
        {
          email: user.email,
        },
        jwtSecret,
        {
          expiresIn: jwtExpireTime,
        }
      );

      const token: Auth = {
        access_token: accessToken,
      };

      return token;
    } catch (error: any) {
      // If something is wrong, return the error
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }

  static async register(req: RegisterRequest): Promise<User | ErrorResponse> {
    try {
      // Check if email is exist
      const user = await UsersRepository.getUserByEmail(req.email);

      if (user) {
        throw new Error('user with the same email already exist');
      }

      // Encrypt password
      const encryptedPassword = bcrypt.hashSync(req.password, SALT_ROUND);

      // Store / create user to database
      const userToCreate: User = {
        email: req.email,
        name: req.name,
        password: encryptedPassword,
        profile_picture_url: req.profile_picture_url,
      };

      const createdUser = await UsersRepository.createUser(userToCreate);

      return createdUser;
    } catch (error: any) {
      // If something is wrong, return the error
      const errorResponse: ErrorResponse = {
        httpCode: 400,
        message: error.message,
      };

      return errorResponse;
    }
  }
}

export default AuthService;
