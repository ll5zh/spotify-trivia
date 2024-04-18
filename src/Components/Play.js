import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import Question from './Question';
import { createRecentTrack, createTopItem, createPopularityItem } from './questions';
import './Play.css';

function Play() {
  const [token, setToken] = useState('');

  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const [index, setIndex] = useState(-1);
  
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    if (accessToken) {
      setToken(accessToken);
      if (token) {
        sendRequests();
      }
    }
  }, [token]);

  useEffect(() => {
    if (recentTracks != '' && topTracks != '' && topArtists != '') {
      console.log(recentTracks);
      console.log(topTracks);
      console.log(topArtists);
      // create questions
      const recentTrackQuestion = createRecentTrack(recentTracks);
      const topTrackQuestion = createTopItem(topTracks, 'track');
      const topArtistQuestion = createTopItem(topArtists, 'artist');
      const popularTrackQuestion = createPopularityItem(topTracks, 'track', true);
      const uniqueTrackQuestion = createPopularityItem(topTracks, 'track', false);
      const popularArtistQuestion = createPopularityItem(topArtists, 'artist', true);
      const uniqueArtistQuestion = createPopularityItem(topArtists, 'artist', false);
      setTriviaQuestions([
        recentTrackQuestion,
        topTrackQuestion,
        topArtistQuestion,
        popularTrackQuestion,
        uniqueTrackQuestion,
        popularArtistQuestion,
        uniqueArtistQuestion,
      ]);
    }
  }, [recentTracks, topTracks, topArtists]);

  useEffect(() => {
    if (triviaQuestions.length === 7) {
      console.log(triviaQuestions);
      setIndex(0);
    }
  }, [triviaQuestions]);

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

  const [nextButton, setNextButton] = useState(false);

  function showNextButton() {
    setNextButton(true);
  }

  function showNextQuestion() {
    setNextButton(false);
    setIndex(index + 1);
  }

  return(
    <div className="Play">
      <h3>Let's Play!</h3>
      {index >= 0 ? (
        <div>
          <h4>Question {index + 1}</h4>
          <Question
            prompt={triviaQuestions[index].prompt}
            answersTrack={triviaQuestions[index].answersTrack}
            answersArtist={triviaQuestions[index].answersArtist}
            answersImage={triviaQuestions[index].answersImage}
            caption={triviaQuestions[index].caption}
            handleNext={showNextButton}
          />
        </div>
      ) : (
        <h4>Waiting</h4>
      )
      }
      {nextButton &&
        <button className="next" onClick={showNextQuestion}>Next</button>
      }
    </div>
  );
}

export default Play;
