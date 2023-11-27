import { useEffect, useState } from 'react';

interface UserEntity {
  id: number;
  name: string;
  email: string;
  profile_picture_url: string;
}

interface TweetEntity {
  id: number;
  content: string;
  user: UserEntity;
}

const tweets_api_base_url = 'http://localhost:8082';

export default function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(tweets_api_base_url + '/api/tweets');
      const responseJSON = await response.json();

      setTweets(responseJSON.data.tweets);
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          localStorage.removeItem('access_token');
        }}
      >
        Logout
      </button>

      <div>
        <h2>List Tweet</h2>

        <div>
          {!tweets.length && <div>Data kosong</div>}

          {tweets &&
            tweets.map((tweet: TweetEntity) => (
              <div key={tweet.id}>
                <h3>{tweet.content}</h3>
                <p>Dibuat oleh {tweet.user.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
