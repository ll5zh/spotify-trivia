import { useEffect, useState } from 'react';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';
import './Redirect.css';

function Redirect() {
  const navigate = useNavigate();

  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    if (code) {
      getToken(code);
    } else {
      setToken('');
    }
  }, []);

  async function getToken(code) {
    let codeVerifier = window.localStorage.getItem('code_verifier');
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
    if (body.status == 200) {
      window.localStorage.setItem('access_token', response.access_token);
      setToken(response.access_token);
    } else {
      setToken('');
    }
  }

  function redirectPlay(isPlay) {
    if (isPlay) navigate('/play', { state: { isDemo: false } });
    else navigate('/');
  }


  return (
    <div className="Redirect">
      {
        token == undefined ? (
          <div className="loader"></div>
        ) : token == '' ? (
          <div>
            <h1>Hmm, we couldn't log you in...</h1>
            <p>Please return to the home page and try again!</p>
            <button className="button" onClick={() => redirectPlay(false)}>Return</button>
          </div>
        ) : (
          <div>
            <h1>You are logged in!</h1>
            <p>Ready to take the ultimate Spotify trivia test?</p>
            <button className="button" onClick={() => redirectPlay(true)}>Play now!</button>
          </div>
        ) 
      }
    </div>
  );
}

export default Redirect;
