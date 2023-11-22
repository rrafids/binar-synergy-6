import { Request, Response } from 'express';
import { DefaultResponse } from '../models/dto/default';
import { Tweet } from '../models/entity/tweet';
import TweetsService from '../services/tweets';
import { TweetRequest, TweetResponse } from '../models/dto/tweet';

class TweetsHandler {
  async getTweets(req: Request, res: Response) {
    const tweetList: TweetResponse[] = await TweetsService.getTweets();

    const response: DefaultResponse = {
      status: 'OK',
      message: 'Success retrieving data',
      data: {
        tweets: tweetList,
      },
    };

    res.status(200).send(response);
  }

  async createTweet(req: Request, res: Response) {
    let payload: TweetRequest = req.body;

    // Payload validation
    if (!payload.content) {
      const response: DefaultResponse = {
        status: 'BAD_REQUEST',
        message: 'Content cannot be empty',
        data: {
          created_tweet: null,
        },
      };

      res.status(400).send(response);
    }

    payload.user_id = req.user.id as number;

    const createdTweet: Tweet = await TweetsService.createTweet(payload);

    const response: DefaultResponse = {
      status: 'CREATED',
      message: 'Tweet succesfully created',
      data: {
        created_tweet: createdTweet,
      },
    };

    res.status(201).send(response);
  }

  // func deleteTweet || updateTweet
  // 1. ambil req.user.id dari middleware
  // 2. sebelum delete, kita get tweet by id (kirim di path url parameter) -> check tweet.user_id === req.user.id
  // 3. kalo sama -> delete
  // 4. kalo ga sama -> return 401
}

export default TweetsHandler;
