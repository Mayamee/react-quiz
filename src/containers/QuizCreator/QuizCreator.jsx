import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import TouchInput from "../../components/UI/TouchInput/TouchInput";
import {
  createControl,
  validateControl,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";
import {
  addQuestionToQuiz,
  createQuiz,
} from "../../store/actions/createQuizAction";

function createOptionControl(number) {
  return createControl(
    {
      label: "Введите вариант ответа №" + number,
      errorMessage: "Ответ не может быть пустым",
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
    option_1: createOptionControl(1),
    option_2: createOptionControl(2),
  };
}

class QuizCreator extends Component {
  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
    touchInputValue: "Мой тест",
  };

  addQuestionHandler = (event) => {
    const { question, option_1, option_2 } = this.state.formControls;
    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option_1.value,
          id: option_1.id,
        },
        {
          text: option_2.value,
          id: option_2.id,
        },
      ],
    };
    this.props.addQuestionToQuiz(questionItem);
    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  createQuizHandler(event) {
    event.preventDefault();
    this.setState(() => ({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
      touchInputValue: "Мой тест",
    }));
    this.props.createQuiz(this.state.touchInputValue);
  }
  onChangeHandler(value, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
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
            {this.renderInputs()}
            <button type="button">Добавить вопрос</button>

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
              ]}
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
