import { useRef, useState, useEffect } from 'react';
import './Question.css';

function Question(
  { prompt,
    answers,
    caption,
    handleNext,
    resetQuestion
  }) {

  const [answered, setAnswered] = useState(false);

  const [correctColour, setCorrectColour] = useState('grey');
  const [incorrectColour, setIncorrectColour] = useState('grey');

  const [correctIndex, setCorrectIndex] = useState(-1);
  
  function showAnswer() {
    // change colours
    setCorrectColour('green');
    setIncorrectColour('red');
    // show caption
    setAnswered(true);
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
      setCorrectColour('grey');
      setIncorrectColour('grey');
      setAnswered(false);
    } else {
      setCorrectColour('green');
      setIncorrectColour('red');
      setAnswered(true);
    }
    console.log(resetQuestion);
    console.log(correctColour);
    console.log(incorrectColour);
  }, [resetQuestion]);
  
  return(
    <div className="Question">
      <p>{prompt}</p>
      <div className="answers">
        <button
          className="answer"
          onClick={showAnswer}
          style={{ backgroundColor: correctIndex == 0 ? correctColour : incorrectColour }}
        >
          <img src={answers[0].image}></img>
          <p>{answers[0].track ? answers[0].track : answers[0].artist}</p>
        </button>
        <button
          className="answer"
          onClick={showAnswer}
          style={{ backgroundColor: correctIndex == 1 ? correctColour : incorrectColour }}
        >
          <img src={answers[1].image}></img>
          <p>{answers[1].track ? answers[1].track : answers[1].artist}</p>
        </button>
        <button
          className="answer"
          onClick={showAnswer}
          style={{ backgroundColor: correctIndex == 2 ? correctColour : incorrectColour }}
        >
          <img src={answers[2].image}></img>
          <p>{answers[2].track ? answers[2].track : answers[2].artist}</p>
        </button>
        <button
          className="answer"
          onClick={showAnswer}
          style={{ backgroundColor: correctIndex == 3 ? correctColour : incorrectColour }}
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
