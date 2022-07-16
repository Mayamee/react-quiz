import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
class Quiz extends Component {
  state = {
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Зеленый", id: 3 },
          { text: "Желтый", id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    console.log(answerId);
  };
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
            question={this.state.quiz[0].question}
            onAnswerClick={this.onAnswerClickHandler}
          />
        </div>
      </div>
    );
  }
}
export default Quiz;
