import { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import { connect } from "react-redux";
import { authCheck } from "./store/actions/authorization";
import NotFound from "./components/NotFound/NotFound";
import Logout from "./components/Logout/Logout";
import MyQuizList from "./containers/MyQuizList/MyQuizList";

function App(props) {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      console.log("check is started");
      checkAuth();
    }
  }, []);
  const { isAuth, checkAuth } = props;
  return (
    <Layout>
      <Routes>
        <Route path="auth" element={isAuth ? <Navigate to="/" /> : <Auth />} />
        <Route path="my" element={<MyQuizList />} />
        <Route path="create" element={<QuizCreator />} />
        <Route path="quiz/:id" element={<Quiz />} />
        <Route path="/" element={<QuizList />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(authCheck()),
});

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
