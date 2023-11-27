import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const tweets_api_base_url = 'http://localhost:8082';

  return (
    <div>
      <h1>Login</h1>

      <form>
        <input
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);

            console.log('email value', email);
          }}
          placeholder='Masukkan email'
        />
        <input
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);

            console.log('password value', password);
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
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
