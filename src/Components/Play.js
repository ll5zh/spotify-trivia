import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

function Play() {
  const [token, setToken] = useState('');

  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      setToken(accessToken);
      if (token) {
        console.log(token);
        sendRequests();
      }
    }
  }, [token]);

  useEffect(() => {
    if (recentTracks != '' && topTracks != '' && topArtists != '') {
      console.log(recentTracks);
      console.log(topTracks);
      console.log(topArtists);
    }
  }, [recentTracks, topTracks, topArtists]);

  async function sendRequests() {
    const authHeaders = {
      Authorization: 'Bearer ' + token,
    };

    // recent tracks
    const recentTracksResponse = await axios.get(BASE_URL + '/me/player/recently-played?limit=4', {
      headers: authHeaders,
    });
    setRecentTracks(recentTracksResponse.data.items);

    // top tracks
    const topTracksResponse = await axios.get(BASE_URL + '/me/top/tracks', {
      headers: authHeaders,
    });
    setTopTracks(topTracksResponse.data.items);

    // top artists
    const topArtistsResponse = await axios.get(BASE_URL + '/me/top/artists', {
      headers: authHeaders,
    });
    setTopArtists(topArtistsResponse.data.items);
  }

  return(
    <div className="Play">
      <h3>Let's Play!</h3>
    </div>
  );

}

export default Play;
