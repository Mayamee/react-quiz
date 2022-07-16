import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // { [id]: success | error }
    quiz: [
      {
        question: "Какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Зеленый", id: 3 },
          { text: "Желтый", id: 4 },
        ],
      },
      {
        question: "Какого цвета луна?",
        rightAnswerId: 1,
        id: 2,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Зеленый", id: 3 },
          { text: "Желтый", id: 4 },
        ],
      },
      {
        question: "В каком году основана Москва?",
        rightAnswerId: 2,
        id: 3,
        answers: [
          { text: "1789", id: 1 },
          { text: "1147", id: 2 },
          { text: "1321", id: 3 },
          { text: "1789", id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    const question = this.state.quiz[this.state.activeQuestion];
    if (question.rightAnswerId === answerId) {
      this.setState({
        answerState: { [answerId]: "success" },
      });
      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log("Вы прошли тест");
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      this.setState({
        answerState: { [answerId]: "error" },
      });
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 >= this.state.quiz.length;
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            answers={this.state.quiz[this.state.activeQuestion].answers}
            question={this.state.quiz[this.state.activeQuestion].question}
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}
export default Quiz;
