import React, { Component } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { axiosAuth } from "../../http/axiosRequests";
import Validation from "../../Validation/Validation";
import { email, required } from "../../Validation/RuleCreator";
import { validateFormFields } from "../../helpers/valid";

class Auth extends Component {
  state = {
    isFormValid: false,
    formFields: [
      {
        type: "email",
        label: "Email",
        value: "",
        validationRules: [email()],
      },
      {
        type: "password",
        label: "Password",
        value: "",
        validationRules: [required()],
      },
    ],
  };
  async loginHandler() {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };
    try {
      this.setState({ isFormValid: false });
      const response = await axiosAuth.post("/login", authData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isFormValid: true });
    }
  }
  async registerHandler() {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
    };
    try {
      this.setState({ isFormValid: false });
      const response = await axiosAuth.post("/registration", authData);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isFormValid: true });
    }
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

  submitHandler(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            <div className="inputsContainer">{this.renderInputs()}</div>
            <Button
              btnType={"success"}
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

export default Auth;
