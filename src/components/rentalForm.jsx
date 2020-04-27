import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
//import { addRental } from "../services/rentalsService";
import { getMovies } from "../services/movieService";
import { getCustomers } from "./../services/customersService";

class RentalForm extends Form {
  state = {
    data: {
      movieId: null,
      customerId: null,
    },
    errors: {},
    movies: [],
    customers: [],
  };

  schema = {
    movieId: Joi.string().required(),
    customerId: Joi.string().required(),
  };

  async componentDidMount() {
    const { data: movies } = await getMovies();
    const { data: customers } = await getCustomers();
    this.setState({ movies, customers });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderSelect("movieId", "Movies", this.state.movies)}
        {this.renderSelect("customerId", "Customers", this.state.customers)}
        {this.renderButton("Add")}
      </form>
    );
  }
}

export default RentalForm;
