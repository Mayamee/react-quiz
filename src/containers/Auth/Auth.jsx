import React, { Component } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Validation from "../../validation/Validation";
import { email, maxLength, minLength } from "../../validation/RuleCreator";
import { validateFormFields } from "../../helpers/valid";
import { createValidationInputField } from "../../helpers/formInputCreator";
import { connect } from "react-redux";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../../store/actions/authorization";

const initForm = () => [
  createValidationInputField("Email", email(), "email"),
  createValidationInputField(
    "Password",
    [minLength(6), maxLength(32)],
    "password"
  ),
];

class Auth extends Component {
  state = {
    isFormValid: false,
    formFields: initForm(),
  };
  loginHandler() {
    this.props.login(
      this.state.formFields[0].value,
      this.state.formFields[1].value
    );
    this.setState({
      formFields: initForm(),
      isFormValid: false,
    });
  }
  registerHandler() {
    this.props.register(
      this.state.formFields[0].value,
      this.state.formFields[1].value
    );
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
  renderInputs() {
    return this.state.formFields.map((field, index) => (
      <Validation rules={field.validationRules} key={`${field.label}-${index}`}>
        <Input
          type={field.type}
          value={field.value}
          label={field.label}
          onChange={this.onChangeHandler.bind(this, index)}
        />
      </Validation>
    ));
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <div className="message">{this.props.msg}</div>
          <form
            className={classes.AuthForm}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="inputsContainer">{this.renderInputs()}</div>
            <Button
              btnType="success"
              onClick={(e) => {
                e.preventDefault();
                this.loginHandler();
              }}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              btnType="primary"
              onClick={(e) => {
                e.preventDefault();
                this.registerHandler();
              }}
              disabled={!this.state.isFormValid}
            >
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  msg: state.auth.msg,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(authLogin(email, password)),
  register: (email, password) => dispatch(authRegister(email, password)),
  // logout: () => dispatch(authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
