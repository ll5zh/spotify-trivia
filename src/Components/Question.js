import { useState, useEffect } from 'react';
import './Question.css';

function Question(
  { prompt,
    answers,
    caption,
    handleNext,
    resetQuestion,
    status
  }) {

  const [answered, setAnswered] = useState(false);

  const DEFAULT_COLOUR = 'grey';
  const CORRECT_COLOUR = 'green';
  const INCORRECT_COLOUR = 'red';

  const [colours, setColours] = useState([DEFAULT_COLOUR, DEFAULT_COLOUR, DEFAULT_COLOUR, DEFAULT_COLOUR]);

  const [correctIndex, setCorrectIndex] = useState(-1);
  
  function showAnswer(index) {
    // change colours
    const isCorrect = index == correctIndex;
    let newColours = colours;
    if (isCorrect) {
      newColours[index] = CORRECT_COLOUR;
    } else {
      newColours[index] = INCORRECT_COLOUR;
      newColours[correctIndex] = CORRECT_COLOUR;
    }
    setColours(newColours);
    // show caption
    setAnswered(true);

    status(isCorrect);
    handleNext();
  }

  function randomizeQuestionOrder() {
    const correctAnswer = answers[0];
    // Fisher-Yates algorithm: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
    for (let i = answers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // in [0, i]
      [answers[i], answers[randomIndex]] = [answers[randomIndex], answers[i]];
    }
    for (let i = 0; i < 4; i++) {
      if (answers[i] === correctAnswer) {
        setCorrectIndex(i);
        break;
      }
    }
  }

  useEffect(() => {
    answers.forEach((answer) => {
      if (answer.track) console.log(answer.track);
      else console.log(answer.artist);
    });
    randomizeQuestionOrder();
    
    if (resetQuestion) {
      setColours([DEFAULT_COLOUR, DEFAULT_COLOUR, DEFAULT_COLOUR, DEFAULT_COLOUR]);
      setAnswered(false);
    } else {
      setAnswered(true);
    }
  }, [resetQuestion]);
  
  return(
    <div className="Question">
      <p>{prompt}</p>
      <div className="answers">
        <button
          className="answer"
          onClick={() => showAnswer(0)}
          style={{ backgroundColor: colours[0] }}
        >
          <img src={answers[0].image}></img>
          <p>{answers[0].track ? answers[0].track : answers[0].artist}</p>
        </button>
        <button
          className="answer"
          onClick={() => showAnswer(1)}
          style={{ backgroundColor: colours[1] }}
        >
          <img src={answers[1].image}></img>
          <p>{answers[1].track ? answers[1].track : answers[1].artist}</p>
        </button>
        <button
          className="answer"
          onClick={() => showAnswer(2)}
          style={{ backgroundColor: colours[2] }}
        >
          <img src={answers[2].image}></img>
          <p>{answers[2].track ? answers[2].track : answers[2].artist}</p>
        </button>
        <button
          className="answer"
          onClick={() => showAnswer(3)}
          style={{ backgroundColor: colours[3] }}
        >
          <img src={answers[3].image}></img>
          <p>{answers[3].track ? answers[3].track : answers[3].artist}</p>
        </button>
      </div>
      {answered &&
        <p>{caption}</p>
      }
    </div>
  )
}

export default Question;
