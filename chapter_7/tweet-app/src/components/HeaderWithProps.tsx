import { Link } from 'react-router-dom';

export default function Header(props: { isLoggedIn: boolean }) {
  const logoutHandler = () => {
    localStorage.removeItem('access_token');

    // setIsLoggedIn(false);
  };

  return (
    <div className='flex justify-between'>
      <h1 className='font-bold text-3xl'>Home</h1>
      {props.isLoggedIn ? (
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
