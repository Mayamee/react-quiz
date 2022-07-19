import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import { createControl } from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import { validate, validateForm } from "../../form/formFramework";

function createOptionControl(number) {
  return createControl(
    {
      label: "Введите вопрос №" + number,
      errorMessage: "Вопрос не может быть пустым",
      id: number,
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым",
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}

class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 0,
    formControls: createFormControls(),
  };

  submitHandler = (event) => {
    event.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  onChangeHandler(value, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = value;
    control.touched = true;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;
    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  }

  selectChangeHandler = (event) => {
    this.setState({ rightAnswerId: +event.target.value });
  };
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            errorMessage={control.errorMessage}
            shouldValidate={!!control.validation}
            valid={control.valid}
            touched={control.touched}
            onChange={(event) =>
              this.onChangeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      );
    });
  }
  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            {select}
            <Button
              btnType="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>
            <Button
              btnType="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;
