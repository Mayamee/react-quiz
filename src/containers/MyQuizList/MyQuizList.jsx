import { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Nodata from "../../components/Nodata/Nodata";
import Loader from "../../components/UI/Loader/Loader";
import { fetchQuizes } from "../../store/actions/quizActions";
import classes from "./MyQuizList.module.scss";
const MyQuizList = ({ isAuth, userName, isLoading, quizes, fetchMyQuizes }) => {
  const renderMyQuizes = () => {
    if (quizes.length === 0) {
      return <Nodata iconColor="#fff" isShowButton={false} />;
    }
    return (
      <ul>
        {quizes.map((quiz) => (
          <li key={quiz.id}>
            <NavLink to={`/quiz/${quiz.id}`}>{quiz.title}</NavLink>
          </li>
        ))}
      </ul>
    );
  };
  useEffect(() => {
    //TODO check auth
    fetchMyQuizes();
  }, []);
  return (
    <div className={classes.MyQuizList}>
      <div>
        <h1>Мои тесты - {userName}</h1>
        {isLoading && <Loader />}
        {!isLoading && renderMyQuizes()}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
  userName: state.auth.user.email,
  isLoading: state.quiz.isLoading,
  quizes: state.quiz.quizes,
});
const mapDispatchToProps = (dispatch) => ({
  fetchMyQuizes: () => dispatch(fetchQuizes({ self: true })),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyQuizList);
