import pool from '../../config/postgresql';
import { User } from '../models/entity/user';

class UsersRepository {
  static async getUsers(queryName: string): Promise<User[]> {
    const getUsers = await pool.query(
      'SELECT id, email, name, profile_picture_url FROM users WHERE name like $1',
      [`%${queryName}%`]
    );

    const response: User[] = getUsers.rows;

    return response;
  }

  static async createUser(user: User): Promise<User> {
    const createUser = await pool.query(
      'INSERT INTO users (email, name, profile_picture_url) VALUES ($1, $2, $3) returning *',
      [user.email, user.name, user.profile_picture_url]
    );

    const createdUser: User = {
      id: createUser.rows[0].id,
      email: createUser.rows[0].email,
      name: createUser.rows[0].name,
      profile_picture_url: createUser.rows[0].profile_picture_url,
    };

    return createdUser;
  }
}

export default UsersRepository;
