import { Tweet } from '../../models/entity/tweet';
import { TweetsRepository } from '../tweets';

describe('getTweets', () => {
  it('should return a list of Tweets', async () => {
    const tweetsRepository = new TweetsRepository();

    const tweetToCreate: Tweet = {
      content: 'test tweet',
      user_id: 1,
    };
    const createdTweet = await tweetsRepository.createTweet(tweetToCreate);

    const getTweet = await tweetsRepository.getTweetByID(
      createdTweet.id as number
    );

    await tweetsRepository.deleteTweetByID(createdTweet.id as number);

    expect(getTweet?.id).toEqual(tweetToCreate.id);
    expect(getTweet?.content).toEqual(tweetToCreate.content);
  });
});
