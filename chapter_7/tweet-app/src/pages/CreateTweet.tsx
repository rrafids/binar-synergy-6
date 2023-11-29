import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tweets_api_base_url = 'http://localhost:8082';

export default function CreateTweet() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');

  return (
    <div>
      <h1>Create New Tweet!</h1>

      <form>
        <input
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
          placeholder='Masukkan content'
        />

        <button
          onClick={async (e) => {
            e.preventDefault();

            const payload = {
              content: content,
            };

            const response = await fetch(tweets_api_base_url + '/api/tweets', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
              body: JSON.stringify(payload),
            });

            const responseJson = await response.json();

            if (response.status !== 201) {
              alert('error: ' + responseJson.message);
            }

            // If create tweet succeed, redirect to home
            navigate('/');
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
