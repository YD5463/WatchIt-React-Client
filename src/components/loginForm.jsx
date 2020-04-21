import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "./../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  // componentDidMount() {
  //   const jwt_token = localStorage.getItem("token");
  //   if (jwt_token) this.props.history.push("/");
  // }
  doSubmit = async () => {
    try {
      await login(this.state.data);
      window.location = "/";
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
