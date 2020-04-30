import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "./../services/authService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await login(this.state.data);
      const newLocation = this.props.location.state || "/";
      window.location = newLocation;
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
          <Link to="/forgotPassword" style={{ float: "right" }}>
            forgot password?
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;
