// Home.js
import React from "react";
import { Link } from "react-router-dom";
import questionnaires from "../api/questionnaires.json";
function Home() {
  return (
    <div>
      <h1>Questionnaires</h1>
      <ul>
        {questionnaires.map((questionnaire) => (
          <li key={questionnaire.id}>
            <div data-testid={`title-${questionnaire.title}`}>
              {questionnaire.title}
            </div>
            <div data-testid="questionnaire-number">
              {questionnaire.total} questions
            </div>
            <Link to={`/questionnaire/${questionnaire.id}`}>
              <button data-testid="attempt">Attempt Quiz</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
