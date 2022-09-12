import { useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../../components/UI/Loader/Loader";
import Nodata from "../../components/Nodata/Nodata";
import {
  clearQuizes,
  fetchQuizEnd,
  fetchQuizes,
} from "../../store/actions/quizActions";
import PageContainer from "../../components/UI/styled/PageContainer/PageContainer";
import QuizItemsList from "../../components/QuizItemsList/QuizItemsList";

const QuizList = ({
  quizes,
  cached,
  isLoading,
  user,
  isAuth,
  fetchQuizes,
  stopLoad,
  clearQuizes,
}) => {
  useEffect(() => {
    if (isAuth) {
      fetchQuizes();
    } else {
      stopLoad();
    }
    return clearQuizes;
  }, []);

  if (isLoading) {
    return (
      <PageContainer
        id="app-page-container"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </PageContainer>
    );
  }
  if (quizes.length === 0 && cached.length === 0) {
    return (
      <PageContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Nodata iconColor="#000" isShowButton={false} />
      </PageContainer>
    );
  }

  return (
    <PageContainer id="app-page-container" sx={{ padding: 3 }}>
      {isAuth && <QuizItemsList isAuth={isAuth} user={user} quizes={quizes} />}
      {!isAuth && <QuizItemsList isAuth={isAuth} user={user} quizes={cached} />}
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    quizes: state.quiz.quizes,
    cached: state.cache.cached,
    isLoading: state.quiz.isLoading,
    user: state.auth.user,
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
