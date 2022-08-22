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
  getQuiz() {
    if (this.props.isLoading) {
      return <Loader />;
    }
    if (this.props.isQuizFinished) {
      return (
        <FinishedQuiz
          results={this.props.results}
          quiz={this.props.quiz}
          onRetry={this.props.resetQuiz}
        />
      );
    }
    if (!this.props.quiz) {
      return <Nodata />;
    }
    if (this.props.quiz.length === 0) {
      return <Nodata />;
    }

    return (
      <ActiveQuiz
        answers={this.props.quiz[this.props.activeQuestion].answers}
        question={this.props.quiz[this.props.activeQuestion].question}
        onAnswerClick={this.props.quizAnswerClick}
        quizLength={this.props.quiz.length}
        answerNumber={this.props.activeQuestion + 1}
        state={this.props.answerState}
      />
    );
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.getQuiz()}
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
