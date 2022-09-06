import React, { Component } from "react";
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

class QuizList extends Component {
  renderQuizesList() {
    const quizes = this.props.isAuth ? this.props.quizes : this.props.cached;
    return quizes.map((quiz) => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>{quiz.title}</NavLink>
      </li>
    ));
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.fetchQuizes();
    } else {
      this.props.stopLoad();
    }
  }
  componentWillUnmount() {
    this.props.clearQuizes();
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.isAuth && <h2>Привет: {this.props.userName}</h2>}
          {!this.props.isAuth && <h2>Привет: Guest</h2>}
          {this.props.isLoading ? (
            <Loader />
          ) : this.props.quizes.length === 0 &&
            this.props.cached.length === 0 ? (
            <Nodata iconColor="#fff" isShowButton={false} />
          ) : (
            <ul>{this.renderQuizesList()}</ul>
          )}
        </div>
      </div>
    );
  }
}

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
