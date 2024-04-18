export function createRecentTrack(data) {
  const prompt = 'Which track did you listen to most recently?';

  console.log(data);
  
  let answersTrack = [];
  data.forEach((track) => {
    answersTrack.push(track.track.name);
  });

  let answersArtist = [];
  data.forEach((track) => {
    answersArtist.push(track.track.artists[0].name);
  });

  let answersImage = [];
  data.forEach((track) => {
    answersImage.push(track.track.album.images[0].url);
  });

  const caption = `Last played at: ${data[0].played_at}.`;

  return {
    prompt: prompt,
    answersTrack: answersTrack,
    answersArtist: answersArtist,
    answersImage: answersImage,
    caption: caption,
  };
}

export function createTopItem(data, type) {
  const prompt = `Which is your top ${type} on Spotify?`;
  
  let answersTrack = [];
  let answersArtist = [];
  let answersImage = [];

  if (type === 'track') {
    for (let i = 0; i < 4; i++) {
      answersTrack.push(data[i].name);
      answersArtist.push(data[i].artists[0].name);
      answersImage.push(data[i].album.images[0].url);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      answersArtist.push(data[i].name);
      answersImage.push(data[i].images[0].url);
    }
  }

  const caption = type === 'track' ? 'You guys go way back.' : 'Did you guess it right?';

  return {
    prompt: prompt,
    answersTrack: answersTrack,
    answersArtist: answersArtist,
    answersImage: answersImage,
    caption: caption,
  }
}

export function createPopularityItem(data, type, isMostPopular) {
  const pronoun = type === 'track' ? 'What' : 'Who';
  const adjective = isMostPopular ? 'popular' : 'unique';
  const prompt = `${pronoun} is one of the most ${adjective} ${type}s in your listening history?`;

  let answersTrack = [];
  let answersArtist = [];
  let answersImage = [];

  if (isMostPopular) {
    data.sort((a, b) => b.popularity - a.popularity); // highest popularity first
  } else {
    data.sort((a, b) => a.popularity - b.popularity); // lowest popularity first
  }
  const popularityToRemove = data[0].popularity;
  console.log(popularityToRemove);

  if (type === 'track') {
    console.log(data);
    answersTrack.push(data[0].name);
    answersArtist.push(data[0].artists[0].name);
    answersImage.push(data[0].album.images[0].url);
    const filteredData = data.filter((track) => track.popularity != popularityToRemove);
    for (let i = 0; i < 3; i++) {
      answersTrack.push(filteredData[i].name);
      answersArtist.push(filteredData[i].artists[0].name);
      answersImage.push(filteredData[i].album.images[0].url);
    }
    console.log(answersTrack);
  } else {
    answersArtist.push(data[0].name);
    answersImage.push(data[0].images[0].url);
    const filteredData = data.filter((artist) => artist.popularity != popularityToRemove);
    for (let i = 0; i < 3; i++) {
      answersArtist.push(filteredData[i].name);
      answersImage.push(filteredData[i].images[0].url);
    }
    console.log(answersArtist);
  }

  const caption = type === 'track' && isMostPopular ? 'An iconic song for the books!'
    : type === 'track' && !isMostPopular ? 'Your niche is impeccable.'
    : type === 'artist' && isMostPopular ? 'A crowd favourite!'
    : `You listen to ${data[0].name}? You are cool.`;

  return {
    prompt: prompt,
    answersTrack: answersTrack,
    answersArtist: answersArtist,
    answersImage: answersImage,
    caption: caption,
  }
}

// pick the highest popularity or lowest popularity
// after that, filter out ones with same popularity as the answer, pick the next three
