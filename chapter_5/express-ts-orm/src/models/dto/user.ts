interface UserRequest {
  name: string;
  email: string;
  profile_picture_file?: Express.Multer.File;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
  profile_picture_url?: string;
}

export { UserRequest, UserResponse };
