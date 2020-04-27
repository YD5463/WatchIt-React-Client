import React, { Component } from "react";
import SearchBox from "./searchBox";
import { getCustomers } from "../services/customersService";
import Table from "./common/table";
import _ from "lodash";

class Rentals extends Component {
  columns = [
    { path: "movie.title", label: "Movie Name" },
    { path: "customer.name", label: "Customer name" },
    { path: "dateOut", label: "From" },
    { path: "dateReturned", label: "To" },
    { path: "rentalFee", label: "Price" },
  ];
  state = {
    rentals: [],
    searchQuery: "",
    sortColumn: { path: "dateOut", order: "desc" },
  };
  async componentDidMount() {
    const customers = await getCustomers();
    this.setState({ customers });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { rentals: customers, searchQuery, sortColumn } = this.state;
    if (searchQuery) {
      return customers.fillter((rental) =>
        rental.movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
  };
  render() {
    const customers = this.getPagedData();
    return (
      
      <React.Fragment>
        <SearchBox
          value={this.searchQuery}
          onChange={this.handleSearch}
        ></SearchBox>
        <Table
          columns={this.columns}
          data={customers}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}
export default Rentals;
