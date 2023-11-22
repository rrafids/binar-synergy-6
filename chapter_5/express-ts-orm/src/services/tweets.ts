import { TweetRequest, TweetResponse } from '../models/dto/tweet';
import { Tweet } from '../models/entity/tweet';
import { TweetsRepository } from '../repositories/tweets';

class TweetsService {
  static async getTweets(): Promise<TweetResponse[]> {
    const listTweet = await TweetsRepository.getTweets();

    const listTweetResponse: TweetResponse[] = listTweet.map((tweet) => {
      const tweetResponse: TweetResponse = {
        id: tweet.id as number,
        content: tweet.content,
        user: {
          id: tweet.user?.id as number,
          name: tweet.user?.name as string,
          email: tweet.user?.email as string,
          profile_picture_file: tweet.user?.profile_picture_url as string,
        },
      };

      return tweetResponse;
    });

    return listTweetResponse;
  }

  static async createTweet(tweet: TweetRequest): Promise<Tweet> {
    try {
      const tweetToCreate: Tweet = {
        content: tweet.content,
        user_id: tweet.user_id,
      };

      const createdTweet = await TweetsRepository.createTweet(tweetToCreate);

      return createdTweet;
    } catch (error) {
      throw error;
    }
  }
}

export default TweetsService;
