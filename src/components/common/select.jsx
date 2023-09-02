import React from "react";

const Select = (props) => {
  const { name, onChange, value, label, error, options } = props;
  return (
    <div className="form-group my-3">
      <label htmlFor={name}>{label}</label>
      <select
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        className="form-control my-2"
      >
        <option value=""></option>
        {options.map((option) => {
          return (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {error && (
        <div className="text-danger">
          <strong className="m-1">
            <i className="fa-solid fa-circle-info"></i>
          </strong>
          {error}
        </div>
      )}
    </div>
  );
};

export default Select;
