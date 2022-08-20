import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Nodata from "../../components/Nodata/Nodata";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { fetchQuizById } from "../../store/actions/quizActions";

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    return <Component {...{ ...props, ...params }} />;
  };
};

class Quiz extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = this.props.id;
    this.props.fetchQuizById(id);
  }
  onAnswerClickHandler = (answerId) => {
    if (this.props.answerState) {
      const key = Object.keys(this.props.answerState)[0];
      if (this.props.answerState[key] === "success") {
        return;
      }
    }
    const question = this.props.quiz[this.props.activeQuestion];
    const results = this.props.results;
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
            activeQuestion: this.props.activeQuestion + 1,
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
    return this.props.activeQuestion + 1 >= this.props.quiz.length;
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
    console.log(this.props);

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.props.isLoading ? (
            <Loader />
          ) : this.props.isQuizFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.onRetryHandler}
            />
          ) : this.props.quiz.length === 0 ? (
            <Nodata />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  results: state.quiz.results,
  isQuizFinished: state.quiz.isQuizFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz,
  isLoading: state.quiz.isLoading,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));
