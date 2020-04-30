import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { forgotPassword } from "../services/authService";
import { toast } from "react-toastify";

class ForgotPasswordForm extends Form {
  state = {
    data: { email: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().required().email().label("Email"),
  };
  doSubmit = async () => {
    try {
      await forgotPassword(this.state.data.email);
      this.props.history.push("/login");
    } catch (ex) {
      toast.error(ex.response.data);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email")}
        {this.renderButton("Send Email")}
      </form>
    );
  }
}

export default ForgotPasswordForm;
