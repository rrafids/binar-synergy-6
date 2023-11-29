import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateTweet from './pages/CreateTweet';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-tweet' element={<CreateTweet />} />
      </Routes>
    </>
  );
}

export default App;
