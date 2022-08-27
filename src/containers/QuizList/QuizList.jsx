import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./QuizList.module.scss";
import { NavLink } from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import Nodata from "../../components/Nodata/Nodata";
import { fetchQuizes } from "../../store/actions/quizActions";

class QuizList extends Component {
  renderQuizesList() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.isLoading ? (
            <Loader />
          ) : this.props.quizes.length === 0 ? (
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
    isLoading: state.quiz.isLoading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
