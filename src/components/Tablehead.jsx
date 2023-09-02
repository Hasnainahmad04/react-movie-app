import React, { Component } from "react";

class Tablehead extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  sortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return (
        <i className="fa-solid fa-arrow-up-wide-short p-2 text-primary"></i>
      );
    return (
      <i className="fa-solid fa-arrow-down-wide-short p-2 text-primary"></i>
    );
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.Columns.map((column) => {
            return (
              <th
                key={column.path || column.key}
                onClick={() => this.raiseSort(column.path)}
              >
                {column.label} {this.sortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default Tablehead;
