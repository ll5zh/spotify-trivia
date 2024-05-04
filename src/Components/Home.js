import { CLIENT_ID, REDIRECT_URI, SCOPE } from '../Constants/constants';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  // functions for authorization with PKCE flow
  function generateCodeVerifier(length) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  async function sha256(plain) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  function base64encode(input) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(input)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  
  // redirect to spotify authorization
  async function loginWithSpotify() {
    const codeVerifier = generateCodeVerifier(64);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    window.localStorage.setItem('code_verifier', codeVerifier);

    let authUrl = new URL('https://accounts.spotify.com/authorize');
    const params = {
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: SCOPE,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: REDIRECT_URI,
    }
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  }

  function playDemo() {
    navigate('/play', { state: { isDemo: true } });
  }

  return (
    <div className="Home">
      <h1>Spotify Trivia</h1>
      <p>How well do you know your Spotify listening history? Play to find out!</p>
      <p>Log in for a personalized experience, or try the quick demo!</p>
      <div>
        <button className="button" onClick={loginWithSpotify}>Login</button>
        <button className="button" onClick={playDemo}>Demo</button>
      </div>
      <a href="https://github.com/ll5zh/spotify-trivia">View Source Code</a>
    </div>
  );
}

export default Home;
