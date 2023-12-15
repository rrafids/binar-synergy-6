import { TweetsRepository } from '../../repositories/tweets';
import TweetsService from '../tweets';

describe('getTweetByID', () => {
  it('should return correct tweet data', async () => {
    const expectedTweetResponse = {
      id: 1,
      content: 'tweet content',
    };

    /** creating dependency of use case */
    const mockTweetsRepository = new TweetsRepository();

    /** mocking needed function */
    mockTweetsRepository.getTweetByID = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedTweetResponse));

    const tweetsService = new TweetsService(mockTweetsRepository);

    const tweet = await tweetsService.getTweetByID(1);

    expect(tweet).toEqual(expectedTweetResponse);
  });
});
