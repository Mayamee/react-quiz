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
import { useState } from "react";

const initForm = () => [
  createValidationInputField("Введите вопрос", required()),
  createValidationInputField("Введите вариант ответа", required()),
  createValidationInputField("Введите вариант ответа", required()),
];

const QuizCreator = ({ quiz, addQuestionToQuiz, createQuiz }) => {
  const [isFormValid, setFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formFields, setFormFields] = useState(initForm());
  const [touchInputValue, setTouchInputValue] = useState("Мой тест");

  const addQuestionHandler = () => {
    const [question, ...inputs] = [...formFields];
    const questionItem = {
      question: question.value,
      id: quiz.length + 1,
      rightAnswerId: rightAnswerId,
      answers: inputs.map((input, index) => ({
        text: input.value,
        id: index + 1,
      })),
    };
    addQuestionToQuiz(questionItem);

    setRightAnswerId(1);
    setFormFields(initForm());
    setFormValid(false);
  };

  const createQuizHandler = (event) => {
    event.preventDefault();

    setRightAnswerId(1);
    setFormFields(initForm());
    setFormValid(false);
    setTouchInputValue("Мой тест");

    createQuiz(touchInputValue);
  };
  const onChangeHandler = (id, value, isValid) => {
    const formFieldsCopy = [...formFields];
    const field = formFieldsCopy[id];
    field.value = value;
    field.isValid = isValid;
    formFieldsCopy[id] = field;
    const isFormValidCopy = validateFormFields(formFieldsCopy);

    setFormFields(formFieldsCopy);
    setFormValid(isFormValidCopy);
  };

  const selectChangeHandler = (event) => {
    setRightAnswerId(+event.target.value);
  };
  const renderOpts = () => {
    return formFields.map((field, index) => (
      <Validation rules={field.validationRules} key={`${field.label}-${index}`}>
        <Input
          label={field.label}
          value={field.value}
          type={field.type}
          onChange={onChangeHandler.bind(this, index)}
        />
      </Validation>
    ));
  };
  const addOption = () => {
    const formFieldsCopy = [...formFields];
    formFieldsCopy.push(
      createValidationInputField("Введите вариант ответа", required())
    );
    setFormFields(formFieldsCopy);
    setFormValid(false);
  };

  return (
    <div className={classes.QuizCreator}>
      <div>
        <h1>
          <TouchInput
            touchInputValue={touchInputValue}
            touchInputonChangeHandler={(target, value) => {
              if (value.length > 50) {
                return;
              }
              setTouchInputValue(value);
              target.style.height = "inherit";
              target.style.height = target.scrollHeight + "px";
            }}
          />
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {renderOpts()}
          {formFields.length < 5 && (
            <AppendButton onClick={addOption.bind(this)}>
              Добавить вариант ответа
            </AppendButton>
          )}
          <Select
            label="Выберите правильный ответ"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={formFields
              .map((option, index) => ({
                text: index,
                value: index,
              }))
              .splice(1)}
          />
          <Button
            btnType="primary"
            onClick={addQuestionHandler}
            disabled={!isFormValid}
          >
            Добавить вопрос
          </Button>
          <Button
            btnType="success"
            onClick={createQuizHandler.bind(this)}
            disabled={quiz.length === 0}
          >
            Создать тест
          </Button>
        </form>
      </div>
    </div>
  );
};

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
