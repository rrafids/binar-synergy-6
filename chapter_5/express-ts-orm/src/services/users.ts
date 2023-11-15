import cloudinary from '../../config/cloudinary';
import { UserRequest } from '../models/dto/user';
import { User } from '../models/entity/user';
import UsersRepository from '../repositories/users';

class UsersService {
  static async getUsers(queryName: string): Promise<User[]> {
    const listUser = await UsersRepository.getUsers(queryName);

    return listUser;
  }

  static async createUser(user: UserRequest): Promise<User> {
    try {
      const fileBase64 = user.profile_picture_file?.buffer.toString('base64');
      const file = `data:${user.profile_picture_file?.mimetype};base64,${fileBase64}`;

      // Async await
      const uploadedFile = await cloudinary.uploader.upload(file); // async

      const userToCreate: User = {
        email: user.email,
        name: user.name,
        profile_picture_url: uploadedFile.url,
      };

      const createdUser = await UsersRepository.createUser(userToCreate);

      return createdUser;
    } catch (error) {
      throw error;
    }

    // Callback
    // cloudinary.uploader.upload(file).then((uploadedFile) => {
    //   const userToCreate: User = {
    //     email: user.email,
    //     name: user.name,
    //     profile_picture_url: uploadedFile.url,
    //   };

    //   UsersRepository.createUser(userToCreate)
    //     .then((createdUser) => {
    //       // callback 3
    //       // callback 4 didalem callback 5
    //       return createdUser;
    //     })
    //     .catch((error) => {
    //       return error
    //     });
    // });
  }
}

export default UsersService;
