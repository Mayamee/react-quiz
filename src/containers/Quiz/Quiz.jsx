import React, { Component } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Nodata from "../../components/Nodata/Nodata";
import Loader from "../../components/UI/Loader/Loader";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchQuizById,
  quizAnswerClick,
  resetQuiz,
} from "../../store/actions/quizActions";

const withRouter = (Component) => {
  return (props) => {
    const params = useParams();
    return <Component {...{ ...props, ...params }} />;
  };
};

class Quiz extends Component {
  componentDidMount() {
    const id = this.props.id;
    this.props.fetchQuizById(id);
  }
  componentWillUnmount() {
    this.props.resetQuiz();
  }
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
              onRetry={this.props.resetQuiz}
            />
          ) : this.props.quiz.length === 0 ? (
            <Nodata />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAnswerClick}
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
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  resetQuiz: () => dispatch(resetQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Quiz));
