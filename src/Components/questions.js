import { recentTracksBackup } from '../Constants/backup';

export function createRecentTrack(data) {
  const prompt = 'Which track did you listen to most recently?';

  let answers = [];

  // add unique tracks
  for (let i = 0; i < 50; i++) {
    if (answers.length == 4) break;
    if (answers.indexOf(data[i]) == -1) {
      answers.push({
        track: data[i].track.name,
        artist: data[i].track.artists[0].name,
        image: data[i].track.album.images[0].url,
      });
    }
  }

  // add backup tracks if there aren't 4 unique tracks
  for (let i = 0; i < 4; i++) {
    if (answers.length == 4) break;
    if (answers.indexOf(recentTracksBackup[i]) == -1) {
      answers.push({
        track: recentTracksBackup[i].track.name,
        artist: recentTracksBackup[i].track.artists[0].name,
        image: recentTracksBackup[i].album.images[0].url,
      })
    }
  }

  const caption = `Last played at: ${data[0].played_at}.`;

  return {
    prompt: prompt,
    answers: answers,
    caption: caption,
  };
}

export function createTopItem(data, type) {
  const prompt = `Which is your top ${type} on Spotify?`;

  let answers = [];
  if (type === 'track') {
    for (let i = 0; i < 4; i++) {
      answers.push({
        track: data[i].name,
        artist: data[i].artists[0].name,
        image: data[i].album.images[0].url,
      });
    }
  } else {
    for (let i = 0; i < 4; i++) {
      answers.push({
        track: null,
        artist: data[i].name,
        image: data[i].images[0].url,
      });
    }
  }
  
  const caption = type === 'track' ? 'You guys go way back.' : 'Did you guess it right?';

  return {
    prompt: prompt,
    answers: answers,
    caption: caption,
  }
}

export function createPopularityItem(data, type, isMostPopular) {
  const pronoun = type === 'track' ? 'What' : 'Who';
  const adjective = isMostPopular ? 'popular' : 'unique';
  const prompt = `${pronoun} is one of the most ${adjective} ${type}s in your listening history?`;

  if (isMostPopular) {
    data.sort((a, b) => b.popularity - a.popularity); // highest popularity first
  } else {
    data.sort((a, b) => a.popularity - b.popularity); // lowest popularity first
  }
  const popularityToRemove = data[0].popularity;

  let answers = [];
  if (type === 'track') {
    answers.push({
      track: data[0].name,
      artist: data[0].artists[0].name,
      image: data[0].album.images[0].url,
    });
    const filteredData = data.filter((track) => track.popularity != popularityToRemove);
    for (let i = 0; i < 3; i++) {
      answers.push({
        track: filteredData[i].name,
        artist: filteredData[i].artists[0].name,
        image: filteredData[i].album.images[0].url,
      });
    }
  } else {
    answers.push({
      track: null,
      artist: data[0].name,
      image: data[0].images[0].url,
    });
    const filteredData = data.filter((artist) => artist.popularity != popularityToRemove);
    for (let i = 0; i < 3; i++) {
      answers.push({
        track: null,
        artist: filteredData[i].name,
        image: filteredData[i].images[0].url,
      })
    }
  }

  const caption = type === 'track' && isMostPopular ? 'An iconic song for the books!'
    : type === 'track' && !isMostPopular ? 'Your niche is impeccable.'
    : type === 'artist' && isMostPopular ? 'A crowd favourite!'
    : `You listen to ${data[0].name}? You are cool.`;

  return {
    prompt: prompt,
    answers: answers,
    caption: caption,
  }
}
