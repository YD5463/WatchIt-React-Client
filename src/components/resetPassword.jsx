import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { resetPassword } from "./../services/authService";
import { toast } from "react-toastify";

class ResetPasswordForm extends Form {
  state = {
    data: { password: "", confirmPassword: "" },
    errors: {},
  };
  schema = {
    password: Joi.string().max(255).required().label("New Password"),
    confirmPassword: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
  };

  doSubmit = async () => {
    try {
      await resetPassword(
        this.props.match.params.token,
        this.state.data.password
      );
      toast("password changed");
      this.props.history.push("/login");
    } catch (ex) {
      console.log(ex);
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("password", "New Password", "password")}
        {this.renderInput("confirmPassword", "Confirm Password", "password")}
        {this.renderButton("Reset")}
      </form>
    );
  }
}

export default ResetPasswordForm;
