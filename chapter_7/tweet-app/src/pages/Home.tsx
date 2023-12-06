import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useDispatch } from 'react-redux';
import { saveToken } from '../redux/slices/token';

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
  const [tweets, setTweets] = useState<TweetEntity[]>([]);

  // Use if you want to use passing state by props
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(tweets_api_base_url + '/api/tweets');
      const responseJSON = await response.json();

      setTweets(responseJSON.data.tweets);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem('access_token');

      // Use if you want to use passing state by props
      if (accessToken) {
        setIsLoggedIn(true);

        // TODO:
        // Save token to redux store
        dispatch(saveToken(accessToken));
      } else setIsLoggedIn(false);
    };

    fetchTweets();
    checkIsLoggedIn();
  }, []);

  return (
    <div className='flex w-full bg-gray-300 place-content-center min-h-screen'>
      <div className='w-[600px] bg-gray-200 p-5'>
        {/* Sample for passing state by props */}
        {/* <div className='flex justify-between'>
          <h1 className='font-bold text-3xl'>Home</h1>
          {isLoggedIn ? (
            <button
              className='py-2 px-3 bg-black text-white rounded-lg'
              onClick={logoutHandler}
            >
              Logout
            </button>
          ) : (
            <Link to='/login'>
              <button className='py-2 px-3 bg-black text-white rounded-lg'>
                Login
              </button>
            </Link>
          )}
        </div> */}

        <Header />

        <div className='mt-[30px]'>
          <div className='flex items-center justify-between'>
            <h1 className='font-bold text-xl'>List Tweet</h1>
            {isLoggedIn && (
              <Link to='/create-tweet'>
                <button className='py-2 px-3  text-white rounded-lg'>
                  <PlusCircleIcon className='w-8 h-8 text-black' />
                </button>
              </Link>
            )}
          </div>

          <div className='mt-[10px]'>
            {!tweets.length && <div>Data kosong</div>}

            {tweets &&
              tweets.map((tweet: TweetEntity) => (
                <div key={tweet.id} className='mt-3'>
                  <h3>{tweet.content}</h3>
                  <p>
                    Dibuat oleh <strong>{tweet.user.name}</strong>
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
