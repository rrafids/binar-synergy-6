import { TweetEntity, Tweet } from '../models/entity/tweet';

class TweetsRepository {
  async getTweets(): Promise<Tweet[]> {
    const listTweet = await TweetEntity.query().withGraphFetched('user');

    return listTweet;
  }

  async createTweet(tweet: Tweet): Promise<Tweet> {
    const createdTweet = await TweetEntity.query().insert({
      content: tweet.content,
      user_id: tweet.user_id,
    });

    return createdTweet;
  }

  async getTweetByID(id: number): Promise<Tweet | null> {
    const tweet = await TweetEntity.query()
      .findById(id)
      .withGraphFetched('user');

    return tweet || null;
  }

  async deleteTweetByID(id: number) {
    await TweetEntity.query().deleteById(id).withGraphFetched('user');
  }
}

export { TweetsRepository };
