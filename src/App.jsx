import React from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import { connect } from "react-redux";
import { authCheck } from "./store/actions/authorization";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      console.log("check is started");
      this.props.checkAuth();
    }
  }
  render() {
    console.log(this.props.isAuth);
    return (
      <Layout>
        <Routes>
          {!this.props.isAuth && <Route path="auth" element={<Auth />} />}
          <Route path="quiz-creator" element={<QuizCreator />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="/" element={<QuizList />} />
        </Routes>
      </Layout>
    );
  }
}
//TODO 404 error

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(authCheck()),
});

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthentificated,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
