import { TweetRequest, TweetResponse } from '../models/dto/tweet';
import { Tweet } from '../models/entity/tweet';
import { TweetsRepository } from '../repositories/tweets';

class TweetsService {
  _tweetsRepository: TweetsRepository;

  constructor(tweetsRepository: TweetsRepository) {
    this._tweetsRepository = tweetsRepository;
  }

  async getTweets(): Promise<TweetResponse[]> {
    const listTweet = await this._tweetsRepository.getTweets();

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

  async getTweetByID(id: number): Promise<TweetResponse> {
    const tweet = await this._tweetsRepository.getTweetByID(id);

    let tweetResponse: TweetResponse = {
      id: 0,
      content: '',
      user: {
        id: 0,
        name: '',
        email: '',
        profile_picture_file: '',
      },
    };

    if (tweet !== null) {
      tweetResponse = {
        id: tweet.id as number,
        content: tweet.content,
        user: {
          id: tweet.user?.id as number,
          name: tweet.user?.name as string,
          email: tweet.user?.email as string,
          profile_picture_file: tweet.user?.profile_picture_url as string,
        },
      };
    }

    return tweetResponse;
  }

  async createTweet(tweet: TweetRequest): Promise<Tweet> {
    const tweetToCreate: Tweet = {
      content: tweet.content,
      user_id: tweet.user_id,
    };

    const createdTweet = await this._tweetsRepository.createTweet(
      tweetToCreate
    );

    return createdTweet;
  }
}

export default TweetsService;
