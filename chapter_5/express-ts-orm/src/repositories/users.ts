import { raw } from 'objection';
import { User, UserEntity } from '../models/entity/user';

class UsersRepository {
  static async getUsers(queryName: string): Promise<User[]> {
    let listUser: User[] = [];

    if (queryName) {
      listUser = await UserEntity.query().where(
        raw('lower("name")'),
        'like',
        `%${queryName}%`
      );
    } else {
      listUser = await UserEntity.query();
    }

    return listUser;
  }

  static async createUser(user: User): Promise<User> {
    const createdUser = await UserEntity.query().insert({
      email: user.email,
      name: user.name,
      profile_picture_url: user.profile_picture_url,
      password: user.password,
    });

    return createdUser;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const user = await UserEntity.query()
      .where(raw('lower("email")'), '=', email)
      .first();

    if (user === undefined) {
      return null;
    }

    return user;
  }

  static async deleteUserByID(id: number) {
    await UserEntity.query().deleteById(id);
  }
}

export default UsersRepository;
