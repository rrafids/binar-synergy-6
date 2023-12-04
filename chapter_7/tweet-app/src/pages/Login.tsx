import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const tweets_api_base_url = 'http://localhost:8082';

interface GoogleOauthResponse {
  credential?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginGoogleSuccess = (response: GoogleOauthResponse) => {
    console.log('response google success:', response);

    // TODO: integrate with backend to save user google credential
    // If user is valid, save the token and redirect to home page
  };

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

      <GoogleOAuthProvider clientId='52535015285-0i182g0q4ccnv9q3i4dgnh7hiah779u3.apps.googleusercontent.com'>
        <GoogleLogin onSuccess={handleLoginGoogleSuccess} />;
      </GoogleOAuthProvider>
    </div>
  );
}
