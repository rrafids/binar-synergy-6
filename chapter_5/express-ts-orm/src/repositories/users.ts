import { raw } from 'objection';
import { User, UserEntity } from '../models/entity/user';

class UsersRepository {
  static async getUsers(queryName: string): Promise<User[]> {
    const listUser = await UserEntity.query().where(
      raw('lower("name")'),
      'like',
      `%${queryName}%`
    );
    return listUser;
  }

  static async createUser(user: User): Promise<User> {
    const createdUser = await UserEntity.query().insert({
      email: user.email,
      name: user.name,
      profile_picture_url: user.profile_picture_url,
    });

    return createdUser;
  }
}

export default UsersRepository;
