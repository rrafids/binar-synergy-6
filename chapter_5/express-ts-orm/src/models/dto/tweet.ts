import { UserResponse } from './user';

interface TweetRequest {
  content: string;
  user_id: number;
}

interface TweetResponse {
  id: number;
  content: string;
  user: UserResponse;
}

export { TweetRequest, TweetResponse };
