import React, { Component } from "react";
import axios from "axios";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
class QuizList extends Component {
  state = {
    quizes: [],
  };
  renderQuizesList() {
    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    const reqOptions = {
      url: "http://localhost:8080/api/quiz",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    };

    try {
      const response = await axios.request(reqOptions);
      if (response.data.data.length === 0) {
        console.log("No data");
        return;
      }
      const quizes = response.data.data.map((question, index) => {
        return {
          id: question.hashsum,
          name: `Тест №${index + 1}`,
        };
      });
      this.setState({ quizes });
    } catch (error) {
      console.log("Error: ", { error });
    }
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
