import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { addCustomer } from "../services/customersService";

class CustomerForm extends Form {
  state = {
    data: {
      name: "",
      isGold: false,
      phone: "",
    },
    errors: {},
  };
  schema = {
    name: Joi.string().required().min(5).max(20),
    isGold: Joi.boolean().required(),
    phone: Joi.string().length(9).regex(/^\d+$/).required(),
  };
  doSubmit = async () => {
    await addCustomer(this.state.data);
    this.props.history.push("/customers");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Add Customer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderCheckBox("isGold","Is Gold?")}
          {this.renderInput("phone", "Cell Phone")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default CustomerForm;
