import React, { Component } from "react";
import classes from "./Auth.module.scss";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
class Auth extends Component {
  state = {};
  loginHandler = () => {};
  registerHandler() {}
  submitHandler(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form className={classes.AuthForm} onSubmit={this.submitHandler}>
            <Input label="Email" />
            <Input label="Пароль" type="password" errorMessage={"test"} />
            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>
            <Button type="primary" onClick={this.registerHandler}>
              Регистрация
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;
