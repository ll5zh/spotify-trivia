function Question(
  { prompt,
    answersTrack,
    answersArtist,
    answersImage,
    caption
  }) {
  return(
    <div className="Question">
      <p>{prompt}</p>
    </div>
  )
}

export default Question;

// pass data
// prompt, answers
