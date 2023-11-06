import { UserRequest } from '../models/dto/user';
import { User } from '../models/entity/user';
import UsersRepository from '../repositories/users';

class UsersService {
  static async getUsers(queryName: string): Promise<User[]> {
    const listUser = await UsersRepository.getUsers(queryName);

    return listUser;
  }

  static async createUser(user: UserRequest): Promise<User> {
    const userToCreate: User = {
      email: user.email,
      name: user.name,
      profile_picture_url: user.profile_picture_url,
    };
    const createdUser = await UsersRepository.createUser(userToCreate);

    return createdUser;
  }
}

export default UsersService;
