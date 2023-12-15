import { Model } from 'objection';
import knexInstance from '../../../config/postgresql';
import { User, UserEntity } from './user';
import { Pojo } from 'objection';

interface TweetModel extends Pojo {
  id?: number;
  content: string;
  user_id: number;
  created_at?: string;
  user?: User;
}

export class TweetEntity extends Model {
  id?: number;
  content!: string;
  user_id!: number;
  created_at?: string;
  user?: User;

  static get tableName() {
    return 'tweets';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserEntity,
        join: {
          from: 'tweets.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

Model.knex(knexInstance);

export type Tweet = TweetModel;
