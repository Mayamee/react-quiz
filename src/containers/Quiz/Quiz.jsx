import React, { Component } from "react";
import axios from "../../http/axiosQuiz";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Nodata from "../../components/Nodata/Nodata";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    return <Component {...{ ...props, ...params }} />;
  };
};

class Quiz extends Component {
  state = {
    results: {},
    isQuizFinished: false,
    isLoading: true,
    activeQuestion: 0,
    answerState: null,
    //TODO: quiz пустой проработать момент
    quiz: [],
  };
  async componentDidMount() {
    const id = this.props.id;
    if (!id) return;

    const reqOptions = {
      url: `${id}`,
      method: "GET",
    };

    try {
      const response = await axios.request(reqOptions);
      if (response.data.data.length === 0) {
        console.log("No data");
        return;
      }
      //TODO 404 status
      const quiz = response.data.data.body;
      this.setState({ quiz, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  }
  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });
      const timeout = setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isQuizFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results,
      });
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 >= this.state.quiz.length;
  }
  onRetryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isQuizFinished: false,
      results: {},
    });
  };
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.isQuizFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.onRetryHandler}
            />
          ) : this.state.quiz.length === 0 ? (
            <Nodata />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default withRouter(Quiz);
