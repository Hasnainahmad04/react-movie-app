import React from "react";

const Input = (props) => {
  const { name, onChange, value, label, error, type } = props;
  return (
    <div className="form-group my-3">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        onChange={onChange}
        id={name}
        name={name}
        value={value}
        className="form-control my-2"
      />
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

export default Input;
