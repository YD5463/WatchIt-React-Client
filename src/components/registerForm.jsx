import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { loginWithJwt } from "../services/authService";
import { register } from "../services/userService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      toast.error("user is already exits");
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
