import { User } from '../../src/models/entity/user';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
