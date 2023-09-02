import React, { Component } from "react";
import _ from "lodash";

class Tablebody extends Component {
  render() {
    const { Columns, data } = this.props;

    const cellRender = (item, column) => {
      if (column.content) return column.content(item);
      return _.get(item, column.path);
    };

    return (
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              {Columns.map((column) => {
                return (
                  <td key={item.id + column.key}>{cellRender(item, column)}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default Tablebody;
