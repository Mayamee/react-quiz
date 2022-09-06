import { useEffect } from "react";
import { connect } from "react-redux";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import Nodata from "../../components/Nodata/Nodata";
import {
  clearQuizes,
  fetchQuizEnd,
  fetchQuizes,
} from "../../store/actions/quizActions";

const QuizList = ({
  quizes: Pquizes,
  cached,
  isLoading,
  userName,
  isAuth,
  fetchQuizes,
  stopLoad,
  clearQuizes,
}) => {
  const renderQuizesList = () => {
    const quizes = isAuth ? Pquizes : cached;
    return quizes.map((quiz) => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.title}</NavLink>
      </li>
    ));
  };
  useEffect(() => {
    if (isAuth) {
      fetchQuizes();
    } else {
      stopLoad();
    }
    return clearQuizes;
  }, []);

  return (
    <div className={classes.QuizList}>
      <div>
        <h1>Список тестов</h1>
        {isAuth && <h2>Привет: {userName}</h2>}
        {!isAuth && <h2>Привет: Guest</h2>}
        {isLoading ? (
          <Loader />
        ) : Pquizes.length === 0 && cached.length === 0 ? (
          <Nodata iconColor="#fff" isShowButton={false} />
        ) : (
          <ul>{renderQuizesList()}</ul>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    cached: state.cache.cached,
    isLoading: state.quiz.isLoading,
    userName: state.auth.user.email,
    isAuth: state.auth.isAuthentificated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
    stopLoad: () => dispatch(fetchQuizEnd()),
    clearQuizes: () => dispatch(clearQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
