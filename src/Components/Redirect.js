import { useEffect, useState } from 'react';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from '../constants';
import { useNavigate } from 'react-router-dom';

function Redirect() {
  const navigate = useNavigate();

  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    console.log(code);
    if (code) {
      getToken(code);
    }
  }, []);

  async function getToken(code) {
    let codeVerifier = window.localStorage.getItem('code_verifier');
    console.log(codeVerifier);
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }),
    }

    let endpoint = new URL('https://accounts.spotify.com/api/token');
    
    const body = await fetch(endpoint.toString(), payload);
    const response = await body.json();
    window.localStorage.setItem('access_token', response.access_token);
    setToken(response.access_token);
    console.log(response);
    console.log(window.localStorage);
    console.log(token);
  }

  function redirectPlay() {
    navigate('/play');
  }

  return (
    <div className="Redirect">
      <h3>You are logged in!</h3>
      <button onClick={() => redirectPlay()}>Click to play</button>
    </div>
  );
}

export default Redirect;
