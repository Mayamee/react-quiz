import React, { Component } from "react";
import axios from "../../axios/axiosQuiz";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
class QuizList extends Component {
  state = {
    quizes: [],
    isLoading: true,
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
      method: "GET",
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
      this.setState({ quizes, isLoading: false });
    } catch (error) {
      console.log("Error: ", { error });
    }
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.state.isLoading ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizesList()}</ul>
          )}
        </div>
      </div>
    );
  }
}

export default QuizList;
