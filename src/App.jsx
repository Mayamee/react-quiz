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
    return (
      <Layout>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="quiz-creator" element={<QuizCreator />} />
          <Route path="quiz/:id" element={<Quiz />} />
          <Route path="/" element={<QuizList />} />
        </Routes>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkAuth: () => dispatch(authCheck()),
});

export default connect(null, mapDispatchToProps)(App);
