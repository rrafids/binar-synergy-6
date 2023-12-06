import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteToken, selectToken } from '../redux/slices/token';

interface tokenInitialState {
  token: string;
}

export default function Header() {
  // TODO: Get token from redux
  const token: tokenInitialState = useSelector(selectToken);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('access_token');

    // TODO: Delete token from redux
    dispatch(deleteToken());
  };

  return (
    <div className='flex justify-between'>
      <h1 className='font-bold text-3xl'>Home</h1>
      {token.token !== '' ? (
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
    </div>
  );
}
