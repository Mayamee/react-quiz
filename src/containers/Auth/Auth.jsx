import { useState } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Validation from "../../validation/Validation";
import {
  email,
  maxLength,
  minLength,
  onlyEnglishEmail,
} from "../../validation/RuleCreator";
import { validateFormFields } from "../../helpers/valid";
import { createValidationInputField } from "../../helpers/formInputCreator";
import { connect } from "react-redux";
import { authLogin, authRegister } from "../../store/actions/authorization";

const initForm = () => [
  createValidationInputField("Email", [email(), onlyEnglishEmail()], "email"),
  createValidationInputField(
    "Password",
    [minLength(6), maxLength(32)],
    "password"
  ),
];

const Auth = ({ login, register, msg }) => {
  const [isFormValid, setFormValid] = useState(false);
  const [formFields, setFormFields] = useState(initForm());

  const loginHandler = () => {
    login(formFields[0].value, formFields[1].value);
    setFormValid(false);
    setFormFields(initForm());
  };
  const registerHandler = () => {
    register(formFields[0].value, formFields[1].value);
    setFormValid(false);
    setFormFields(initForm());
  };

  const onChangeHandler = (id, value, isValid) => {
    const formFieldsCopy = [...formFields];
    const field = formFieldsCopy[id];
    field.value = value;
    field.isValid = isValid;
    formFieldsCopy[id] = field;
    const isFormValid = validateFormFields(formFieldsCopy);
    setFormValid(isFormValid);
    setFormFields(formFieldsCopy);
  };
  const renderInputs = () =>
    formFields.map((field, index) => (
      <Validation rules={field.validationRules} key={`${field.label}-${index}`}>
        <Input
          type={field.type}
          value={field.value}
          label={field.label}
          onChange={onChangeHandler.bind(this, index)}
        />
      </Validation>
    ));

  return (
    <div className={classes.Auth}>
      <div>
        <h1>Авторизация</h1>
        <div className="message">{msg}</div>
        <form className={classes.AuthForm} onSubmit={(e) => e.preventDefault()}>
          <div className="inputsContainer">{renderInputs()}</div>
          <Button
            btnType="success"
            onClick={(e) => {
              e.preventDefault();
              loginHandler();
            }}
            disabled={!isFormValid}
          >
            Войти
          </Button>
          <Button
            btnType="primary"
            onClick={(e) => {
              e.preventDefault();
              registerHandler();
            }}
            disabled={!isFormValid}
          >
            Регистрация
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  msg: state.auth.msg,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(authLogin(email, password)),
  register: (email, password) => dispatch(authRegister(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
