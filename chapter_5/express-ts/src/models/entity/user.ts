// TODO: Add photo_profile_url field
// Entity will define the object from database
interface User {
  id?: number;
  name: string;
  email: string;
  profile_picture_url?: string;
}

export { User };
