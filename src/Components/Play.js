import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Constants/constants';
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

  const [container, setContainer] = useState(['auto']);

  const QUESTION_COUNT = 7;

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
    if (triviaQuestions.length === QUESTION_COUNT) {
      console.log(triviaQuestions);
      setIndex(0);
    }
  }, [triviaQuestions]);

  useEffect(() => {
    if (index == -1 || index == QUESTION_COUNT) {
      setContainer('auto');
    } else {
      setContainer('90vh');
    }
  }, [index]);

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

  const [score, setScore] = useState(0);

  function updateScore(isCorrect) {
    if (isCorrect) {
      setScore(score + 1);
    }
  }

  return(
    <div className="Play" style={{ minHeight: container }}>
      <h1>Spotify Trivia</h1>
      {index >= 0 && index < QUESTION_COUNT ? (
        <div class="play-container">
          <p className="bold">Question {index + 1} of {QUESTION_COUNT}</p>
          <Question
            prompt={triviaQuestions[index].prompt}
            answers={triviaQuestions[index].answers}
            caption={triviaQuestions[index].caption}
            handleNext={showNextButton}
            resetQuestion={true}
            status={updateScore}
            key={index.toString()}
          />
          {nextButton &&
            <button className="button next" onClick={showNextQuestion}>Next</button>
          }
        </div>
      ) : index == QUESTION_COUNT ? (
        <div>
          <p className="bold">Thanks for playing! Your score is { score } out of { QUESTION_COUNT }.</p>
          <button className="button">Log out</button>
        </div>
      ): (
        <div class="loader"></div>
      )
      }
      
    </div>
  );
}

export default Play;
