import React, { Component } from "react";
import SearchBox from "./searchBox";
import { getRetntals, returnRental } from "../services/rentalsService";
import Table from "./common/table";
import _ from "lodash";
import { Link } from "react-router-dom";
//import { getLoggedUser } from "../services/authService";

class Rentals extends Component {
  columns = [
    { path: "movie.title", label: "Movie Name" },
    { path: "customer.name", label: "Customer name" },
    { path: "dateOut", label: "From" },
    { path: "dateReturned", label: "To" },
    {
      key: "return",
      content: (rental) => (
        <button
          className="btn btn-success btn-sm"
          onClick={() => this.handleReturn(rental)}
        >
          Return
        </button>
      ),
    },
  ];

  state = {
    rentals: [],
    searchQuery: "",
    sortColumn: { path: "dateOut", order: "desc" },
  };
  handleReturn = async (rental) => {
    await returnRental({
      customerId: rental.customer._id,
      movieId: rental.movie._id,
    });
    window.location = "/rentals";
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { rentals, searchQuery, sortColumn } = this.state;
    let filteredRentals = rentals;
    console.log("im here");
    console.log(filteredRentals);
    if (searchQuery) {
      filteredRentals = filteredRentals.filter((rental) =>
        rental.movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    filteredRentals = _.orderBy(
      filteredRentals,
      [sortColumn.path],
      [sortColumn.order]
    );
    return filteredRentals;
  };
  async componentDidMount() {
    const { data: rentals } = await getRetntals();
    this.setState({ rentals });
  }
  render() {
    const rentals = this.getPagedData();
    return (
      <React.Fragment>
        <SearchBox
          value={this.searchQuery}
          onChange={this.handleSearch}
        ></SearchBox>
        <Table
          columns={this.columns}
          data={rentals}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
        />
        <Link
          to="/rentals/new"
          className="btn btn-primary btn-circle add-btn m-5"
        >
          <i className="fa fa-plus fa-lg center"></i>
        </Link>
      </React.Fragment>
    );
  }
}
export default Rentals;
