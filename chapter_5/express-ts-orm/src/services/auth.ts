import { LoginRequest, RegisterRequest } from '../models/dto/auth';
import { ErrorResponse } from '../models/entity/default';
import { User } from '../models/entity/user';
import UsersRepository from '../repositories/users';
import bcrypt from 'bcrypt';

const SALT_ROUND = 10;

class AuthService {
  static async login(req: LoginRequest): Promise<string> {
    try {
      // Check if email is exist
      // const user = await UsersRepository.getUserByEmail(req.email);
      // Check if password is correct
      // If something is wrong, return the error

      return 'jwt-token';
    } catch (error) {
      throw error;
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
