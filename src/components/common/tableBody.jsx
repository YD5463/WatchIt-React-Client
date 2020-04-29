import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  containsNulls = false;
  renderCell = (item, column) => {
    if (column.content && this.containsNulls) return column.content(item);

    const value = _.get(item, column.path);
    if (!value) this.containsNulls = true;
    return value;
  };

  createKey = (item, column) => {
    // console.log("key is:");
    // console.log(item._id + (column.path || column.key));
    return item._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => {
          this.containsNulls = false;
          return (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
