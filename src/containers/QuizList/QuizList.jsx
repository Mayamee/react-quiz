import React, { Component } from "react";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
class QuizList extends Component {
  state = {};
  renderQuizesList() {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${quiz}`}>Тест №{quiz}</NavLink>
        </li>
      );
    });
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          <ul>{this.renderQuizesList()}</ul>
        </div>
      </div>
    );
  }
}

export default QuizList;
