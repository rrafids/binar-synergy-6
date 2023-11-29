import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tweets_api_base_url = 'http://localhost:8082';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Login</h1>

      <form>
        <input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          placeholder='Masukkan email'
        />
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          type='password'
          placeholder='Masukkan password'
        />

        <button
          onClick={async (e) => {
            e.preventDefault();

            const payload = {
              email: email,
              password: password,
            };

            const response = await fetch(
              tweets_api_base_url + '/api/auth/login',
              {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              }
            );

            const responseJson = await response.json();

            if (response.status !== 200) {
              alert('error: ' + responseJson.message);
            }

            localStorage.setItem(
              'access_token',
              responseJson.data.access_token
            );

            // If login succeed, redirect ke home
            navigate('/');
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
