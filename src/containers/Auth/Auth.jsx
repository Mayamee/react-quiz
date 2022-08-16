import React, { Component } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { validateControl, validateForm } from "../../form/formFramework";
import { axiosAuth } from "../../http/axiosRequests";
class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: "",
        type: "email",
        label: "Email",
        errorMessage: "Введите корректный email",
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: "",
        type: "password",
        label: "Пароль",
        errorMessage: "Пароль должен быть от 6 до 32 символов включительно",
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
          maxLength: 32,
        },
      },
    },
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

  onChangeHandler(event, controlName) {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);
    formControls[controlName] = control;
    const isFormValid = validateForm(formControls);
    this.setState({
      formControls,
      isFormValid,
    });
  }
  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Input
          key={controlName + index}
          type={control.type}
          value={control.value}
          touched={control.touched}
          valid={control.valid}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onChangeHandler(event, controlName)}
        />
      );
    });
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
