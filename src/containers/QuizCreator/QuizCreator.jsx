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
import Validation from "../../validation/Validation";
import { required } from "../../validation/RuleCreator";
import { validateFormFields } from "../../helpers/valid";
import { createValidationInputField } from "../../helpers/formInputCreator";

const initForm = () => [
  createValidationInputField("Введите вопрос", required()),
  createValidationInputField("Введите вариант ответа", required()),
  createValidationInputField("Введите вариант ответа", required()),
];

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formFields: initForm(),
    touchInputValue: "Мой тест",
  };

  addQuestionHandler = () => {
    const [question, ...inputs] = [...this.state.formFields];
    console.log(inputs);
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: inputs.map((input, index) => ({
        text: input.value,
        id: index + 1,
      })),
    };
    this.props.addQuestionToQuiz(questionItem);
    this.setState({
      rightAnswerId: 1,
      formFields: initForm(),
      isFormValid: false,
    });
  };
  createQuizHandler(event) {
    event.preventDefault();
    this.setState(() => ({
      isFormValid: false,
      rightAnswerId: 1,
      formFields: initForm(),
      touchInputValue: "Мой тест",
    }));
    this.props.createQuiz(this.state.touchInputValue);
  }
  onChangeHandler(id, value, isValid) {
    const formFields = [...this.state.formFields];
    const field = formFields[id];
    field.value = value;
    field.isValid = isValid;
    formFields[id] = field;
    const isFormValid = validateFormFields(formFields);
    this.setState({
      formFields,
      isFormValid,
    });
  }

  selectChangeHandler = (event) => {
    this.setState({ rightAnswerId: +event.target.value });
  };
  renderOpts() {
    return this.state.formFields.map((field, index) => (
      <Validation rules={field.validationRules} key={`${field.label}-${index}`}>
        <Input
          label={field.label}
          value={field.value}
          type={field.type}
          onChange={this.onChangeHandler.bind(this, index)}
        />
      </Validation>
    ));
  }
  addOption() {
    const formFields = [...this.state.formFields];
    formFields.push(
      createValidationInputField("Введите вариант ответа", required())
    );
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
          <form onSubmit={(e) => e.preventDefault()}>
            {this.renderOpts()}
            {this.state.formFields.length < 5 && (
              <AppendButton onClick={this.addOption.bind(this)}>
                Добавить вариант ответа
              </AppendButton>
            )}
            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={this.state.formFields
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
