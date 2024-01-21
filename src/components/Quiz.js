// Quiz.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Question from "./Question";
import questionBank from "../api/questionBank.json";

function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const selectedQuestions = questionBank.find(
      (item) => item.id === parseInt(id, 10)
    );

    if (selectedQuestions) {
      setQuestions(selectedQuestions.questionList);
    } else {
      alert("Questions not found");
    }
  }, [id]);

  const handleAnswer = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.Answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleValidationTimeout = () => {
    handleNextQuestion();
  };

  return (
    <div>
      {questions.length > 0 &&
      currentQuestionIndex < questions.length &&
      !quizCompleted ? (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onNextQuestion={handleNextQuestion}
          onValidationTimeout={handleValidationTimeout}
        />
      ) : (
        <div data-testid="score">
          <h2>Thanks for giving the test</h2>
          <hr />

          <p>Your Score: {score}</p>
          <p>Correct Answers: {score}</p>
          <p>Incorrect Answers: {questions.length - score}</p>
        </div>
      )}
    </div>
  );
}

export default Quiz;
