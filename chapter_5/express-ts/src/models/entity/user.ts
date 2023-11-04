// TODO: Add photo_profile_url field
// Entity will define the object from database
interface User {
  id: number;
  name?: string;
  profilePictureUrl?: string;
}

export { User };
