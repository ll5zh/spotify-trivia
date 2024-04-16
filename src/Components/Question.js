import './Question.css';

function Question(
  { prompt,
    answersTrack,
    answersArtist,
    answersImage,
    caption,
    handleNext
  }) {

  function showAnswer() {
    handleNext();
  }
  
  return(
    <div className="Question">
      <p>{prompt}</p>
      <div className="answers">
        <button className="answer" onClick={showAnswer}>
          <img src={answersImage[0]}></img>
          <p>{answersTrack[0]}</p>
        </button>
        <button className="answer" onClick={showAnswer}>
          <img src={answersImage[1]}></img>
          <p>{answersTrack[1]}</p>
        </button>
        <button className="answer" onClick={showAnswer}>
          <img src={answersImage[2]}></img>
          <p>{answersTrack[2]}</p>
        </button>
        <button className="answer" onClick={showAnswer}>
          <img src={answersImage[3]}></img>
          <p>{answersTrack[3]}</p>
        </button>
      </div>
    </div>
  )
}

export default Question;

// pass data
// prompt, answers
