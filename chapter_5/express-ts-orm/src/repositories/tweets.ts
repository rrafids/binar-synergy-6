import { Tweet, TweetEntity } from '../models/entity/tweet';

class TweetsRepository {
  static async getTweets(): Promise<Tweet[]> {
    const listTweet = await TweetEntity.query().withGraphFetched('user');

    return listTweet;
  }

  static async createTweet(tweet: Tweet): Promise<Tweet> {
    const createdTweet = await TweetEntity.query().insert({
      content: tweet.content,
      user_id: tweet.user_id,
    });

    return createdTweet;
  }
}

export { TweetsRepository };
