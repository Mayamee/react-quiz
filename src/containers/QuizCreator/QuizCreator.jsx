import React, { Component } from "react";
import classes from "./QuizCreator.module.scss";
import Button from "../../components/UI/Button/Button";
import TouchInput from "../../components/UI/TouchInput/TouchInput";
import { checkObjectPropertyDeepByPath } from "../../helpers/valid";
import { axiosQuiz } from "../../http/axiosRequests";
import {
  createControl,
  validateControl,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

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
    rightAnswerId: 1,
    formControls: createFormControls(),
    touchInputValue: "Мой тест",
  };

  addQuestionHandler = (event) => {
    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;
    const { question, option1, option2, option3, option4 } =
      this.state.formControls;
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {
          text: option1.value,
          id: option1.id,
        },
        {
          text: option2.value,
          id: option2.id,
        },
        {
          text: option3.value,
          id: option3.id,
        },
        {
          text: option4.value,
          id: option4.id,
        },
      ],
    };
    quiz.push(questionItem);
    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  async createQuizHandler(event) {
    const payload = {
      title: this.state.touchInputValue || "Мой тест",
      body: this.state.quiz,
    };
    const reqOptions = {
      method: "POST",
      data: payload,
    };
    try {
      await axiosQuiz.request(reqOptions);
    } catch (error) {
      if (
        checkObjectPropertyDeepByPath(error, ["response", "data", "status"])
      ) {
        console.log(error.response.data.status);
      } else {
        console.log(error);
      }
    }
    this.setState(() => ({
      quiz: [],
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    }));
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
