import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import TouchInput from "../../components/UI/TouchInput/TouchInput";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  addQuestionToQuiz,
  createQuiz,
} from "../../store/actions/createQuizAction";
import AppendButton from "../../components/UI/AppendButton/AppendButton";
import Validation from "../../hoc/Validation/Validation";

const createInputField = (label, value = "") => ({
  label,
  value,
});

const createFormFields = () => ({
  options: [
    createInputField("Введите вопрос"),
    createInputField("Введите вариант ответа"),
    createInputField("Введите вариант ответа"),
  ],
});

class QuizCreator extends Component {
  state = {
    //TODO make validation
    isFormValid: true,
    rightAnswerId: 1,
    formFields: createFormFields(),
    touchInputValue: "Мой тест",
  };

  addQuestionHandler = (event) => {
    const [question, ...options] = [...this.state.formFields.options];
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: options.map((option, index) => ({
        text: option.value,
        id: index + 1,
      })),
    };
    this.props.addQuestionToQuiz(questionItem);
    this.setState({
      rightAnswerId: 1,
      formFields: createFormFields(),
    });
  };
  createQuizHandler(event) {
    event.preventDefault();
    this.setState(() => ({
      isFormValid: false,
      rightAnswerId: 1,
      formFields: createFormFields(),
      touchInputValue: "Мой тест",
    }));
    this.props.createQuiz(this.state.touchInputValue);
  }
  onChangeHandler(id, value) {
    const options = [...this.state.formFields.options];
    const option = options[id];
    option.value = value;
    const formFields = { ...this.state.formFields };
    formFields.options[id] = option;
    this.setState({
      formFields,
    });
  }

  selectChangeHandler = (event) => {
    this.setState({ rightAnswerId: +event.target.value });
  };
  renderOpts() {
    return this.state.formFields.options.map((option, index) => {
      return (
        <Validation rule="email" key={`${option.label}-${index}`}>
          <Input
            key={`${option.label}-${index}`}
            label={option.label}
            value={option.value}
            onChange={(event) =>
              this.onChangeHandler(index, event.target.value)
            }
          />
        </Validation>
      );
    });
  }
  addOption() {
    const options = [...this.state.formFields.options];
    options.push(createInputField("Введите вариант ответа"));
    const formFields = { ...this.state.formFields };
    formFields.options = options;
    this.setState({
      formFields,
    });
  }
  render() {
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>
            <TouchInput
              touchInputValue={this.state.touchInputValue}
              touchInputonChangeHandler={(target, value) => {
                if (value.length > 50) {
                  return;
                }
                this.setState({ touchInputValue: value });
                target.style.height = "inherit";
                target.style.height = target.scrollHeight + "px";
              }}
            />
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {this.renderOpts()}
            {this.state.formFields.options.length < 5 && (
              <AppendButton onClick={this.addOption.bind(this)}>
                Добавить вариант ответа
              </AppendButton>
            )}
            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={this.state.formFields.options
                .map((option, index) => ({
                  text: index,
                  value: index,
                }))
                .splice(1)}
            />
            <Button
              btnType="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              btnType="success"
              onClick={this.createQuizHandler.bind(this)}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.createQuiz.quiz,
  };
};
const mapDispatchToProps = (dispatch) => ({
  addQuestionToQuiz: (question) => dispatch(addQuestionToQuiz(question)),
  createQuiz: (touchInputValue) => dispatch(createQuiz(touchInputValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
