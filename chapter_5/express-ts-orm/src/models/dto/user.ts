interface UserRequest {
  name: string;
  email: string;
  profile_picture_file?: Express.Multer.File;
}

export { UserRequest };
