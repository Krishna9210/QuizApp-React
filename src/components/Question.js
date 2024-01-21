import React, { useState, useEffect } from "react";

function Question({ question, onAnswer, onNextQuestion, onValidationTimeout }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    let timer;

    if (!isAnswered) {
      // If the question is not answered, trigger the next question after 10 seconds
      timer = setTimeout(() => {
        onValidationTimeout();
      }, 10000);
    }

    return () => clearTimeout(timer); // Clear the timer on component unmount or answer change
  }, [isAnswered, onValidationTimeout]);

  const handleAnswerValidation = () => {
    setIsAnswered(true);
    onAnswer(selectedOption);
  };

  const handleNextQuestion = () => {
    // Reset state for the next question
    setSelectedOption(null);
    setIsAnswered(false);

    // Trigger the next question
    onNextQuestion();
  };

  return (
    <div>
      <div data-testid="question">{question.questions}</div>
      {question.option1 && (
        <div>
          <label>
            <input
              type="radio"
              name="options"
              value={1}
              onChange={() => setSelectedOption(1)}
              checked={selectedOption === 1}
              disabled={isAnswered}
            />
            {question.option1}
          </label>
        </div>
      )}
      {question.option2 && (
        <div>
          <label>
            <input
              type="radio"
              name="options"
              value={2}
              onChange={() => setSelectedOption(2)}
              checked={selectedOption === 2}
              disabled={isAnswered}
            />
            {question.option2}
          </label>
        </div>
      )}
      {question.option3 && (
        <div>
          <label>
            <input
              type="radio"
              name="options"
              value={3}
              onChange={() => setSelectedOption(3)}
              checked={selectedOption === 3}
              disabled={isAnswered}
            />
            {question.option3}
          </label>
        </div>
      )}
      {question.option4 && (
        <div>
          <label>
            <input
              type="radio"
              name="options"
              value={4}
              onChange={() => setSelectedOption(4)}
              checked={selectedOption === 4}
              disabled={isAnswered}
            />
            {question.option4}
          </label>
        </div>
      )}
      <div>
        {isAnswered && (
          <div
            data-testid="validate-message"
            style={{
              color: isAnswered
                ? selectedOption === question.Answer
                  ? "green"
                  : "red"
                : "black",
            }}
          >
            {selectedOption === question.Answer ? "Correct!" : "Wrong!"}
          </div>
        )}
        <button
          data-testid="ok"
          onClick={handleAnswerValidation}
          disabled={isAnswered}
        >
          OK
        </button>
        <button
          data-testid="next"
          onClick={handleNextQuestion}
          disabled={!isAnswered}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question;
