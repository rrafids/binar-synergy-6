import request from 'supertest';
import app from '../../app';

describe('GET /tweets', () => {
  let server: any;

  beforeEach(() => {
    server = app.listen(process.env.APP_PORT, () => {
      console.log(
        `Server is running on http://localhost:${process.env.APP_PORT}`
      );
    });
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should response with 200 as status code and return list of tweet', async () => {
    return request(app)
      .get('/api/tweets')
      .set('Content-type', 'application/json')
      .then(async (res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.data.tweets).toBeInstanceOf(Array);
      });
  });
});
