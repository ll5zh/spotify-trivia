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

  const caption = data[0].played_at;

  return {
    prompt: prompt,
    answersTrack: answersTrack,
    answersArtist: answersArtist,
    answersImage: answersImage,
    caption: caption,
  };
}
