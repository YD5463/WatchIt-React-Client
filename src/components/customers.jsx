import React, { Component } from "react";
import SearchBox from "./searchBox";
import { getCustomers } from "../services/customersService";
import Table from "./common/table";
import _ from "lodash";

class Customer extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Cell Phone" },
    { path: "isGold", label: "Is Gold" },
  ];
  state = {
    customers: [],
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
  };
  async componentDidMount() {
    const { data: customers } = await getCustomers();
    this.setState({ customers });
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const { customers, searchQuery, sortColumn } = this.state;
    if (searchQuery) {
      return customers.fillter((c) =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return _.orderBy(customers, [sortColumn.path], [sortColumn.order]);
  };
  render() {
    const customers = this.getPagedData();
    if (customers.length === 0) return <p>there is no customers</p>;
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

export default Customer;
