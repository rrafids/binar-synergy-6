import { Tweet } from '../../models/entity/tweet';
import TweetsRepository from '../tweets';

describe('getTweetByID', () => {
  it('should return a tweet data', async () => {
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

    // Assertion
    expect(getTweet?.id).toEqual(createdTweet.id);
    expect(getTweet?.content).toEqual(tweetToCreate.content);
  });
});

// TODO: Create unit test for createTweet repository
