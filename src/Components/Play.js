import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Constants/constants';
import { recentTracksDemo, topTracksDemo, topArtistsDemo } from '../Constants/demoData';
import Question from './Question';
import { createRecentTrack, createTopItem, createPopularityItem } from './questions';
import './Play.css';

function Play() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDemo } = location.state;

  const [token, setToken] = useState('');

  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  const [index, setIndex] = useState(-1);
  
  const [triviaQuestions, setTriviaQuestions] = useState([]);

  const [container, setContainer] = useState(['auto']);

  const QUESTION_COUNT = 7;

  useEffect(() => {
    if (isDemo) {
      mockDemoRequests();
    } else {
      const accessToken = window.localStorage.getItem('access_token');
      if (accessToken) {
        setToken(accessToken);
        if (token) {
          sendRequests();
        }
      }
    }
  }, [token]);

  useEffect(() => {
    if (recentTracks != '' && topTracks != '' && topArtists != '') {
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
    const recentTracksResponse = await axios.get(BASE_URL + '/me/player/recently-played?limit=50', {
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

  function mockDemoRequests() {
    setRecentTracks(recentTracksDemo);
    setTopTracks(topTracksDemo);
    setTopArtists(topArtistsDemo);
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

  function endGame() {
    if (!isDemo) {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('code_verifier');
    }
    navigate('/');
  }

  return(
    <div className="Play" style={{ minHeight: container }}>
      <h1>Spotify Trivia</h1>
      {index >= 0 && index < QUESTION_COUNT ? (
        <div className="play-container">
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
          {isDemo ? (
            <button className="button" onClick={endGame}>Return</button>
          ) : (
            <button className="button" onClick={endGame}>Log out</button>
          )
          }
        </div>
      ): (
        <div className="loader"></div>
      )
      }
      
    </div>
  );
}

export default Play;
