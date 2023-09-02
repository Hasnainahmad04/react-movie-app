import React from "react";
import Tablebody from "./Tablebody";
import Tablehead from "./Tablehead";

const Table = (props) => {
  const { Columns, sortColumn, data, onSort } = props;
  return (
    <div className="table-responsive">
      <table className="table">
        <Tablehead Columns={Columns} sortColumn={sortColumn} onSort={onSort} />
        <Tablebody data={data} Columns={Columns} />
      </table>
    </div>
  );
};

export default Table;
