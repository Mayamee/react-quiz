import { useParams } from "react-router-dom";
import { useEffect } from "react";
import classes from "./Quiz.module.scss";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Nodata from "../../components/Nodata/Nodata";
import Loader from "../../components/UI/Loader/Loader";
import { connect } from "react-redux";
import {
  fetchQuizById,
  getQuizFromCacheById,
  quizAnswerClick,
  resetQuiz,
} from "../../store/actions/quizActions";

const Quiz = ({
  isAuth,
  results,
  isQuizFinished,
  activeQuestion,
  answerState,
  quiz,
  title,
  isLoading,
  fetchQuizById,
  getQuizFromCacheById,
  quizAnswerClick,
  resetQuiz,
}) => {
  const params = useParams();
  useEffect(() => {
    const { id } = params;
    if (isAuth) {
      fetchQuizById(id);
    } else {
      getQuizFromCacheById(id);
    }
    return resetQuiz;
  }, []);

  const getQuiz = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (isQuizFinished) {
      return <FinishedQuiz results={results} quiz={quiz} onRetry={resetQuiz} />;
    }
    //TODO quiz
    if (!quiz) {
      return <Nodata />;
    }
    if (quiz.length === 0) {
      return <Nodata />;
    }

    return (
      <ActiveQuiz
        answers={quiz[activeQuestion].answers}
        question={quiz[activeQuestion].question}
        onAnswerClick={quizAnswerClick}
        quizLength={quiz.length}
        answerNumber={activeQuestion + 1}
        state={answerState}
      />
    );
  };
  return (
    <div className={classes.Quiz}>
      <div className={classes.QuizWrapper}>
        <h1>{title}</h1>
        {getQuiz()}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  results: state.quiz.results,
  isQuizFinished: state.quiz.isQuizFinished,
  activeQuestion: state.quiz.activeQuestion,
  answerState: state.quiz.answerState,
  quiz: state.quiz.quiz?.body,
  title: state.quiz.quiz?.title,
  isLoading: state.quiz.isLoading,
  isAuth: state.auth.isAuthentificated,
});
const mapDispatchToProps = (dispatch) => ({
  fetchQuizById: (id) => dispatch(fetchQuizById(id)),
  getQuizFromCacheById: (id) => dispatch(getQuizFromCacheById(id)),
  quizAnswerClick: (answerId) => dispatch(quizAnswerClick(answerId)),
  resetQuiz: () => dispatch(resetQuiz()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
