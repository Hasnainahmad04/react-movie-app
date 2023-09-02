import React, { Component } from "react";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleInput = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validiateInput(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validiateForm();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.afterSubmit();
  };

  renderButton(label) {
    return (
      <button
        className="btn btn-outline-primary"
        type="submit"
        disabled={this.validiateForm()}
      >
        {label}
      </button>
    );
  }

  renderInput(type, name, label) {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleInput}
        error={errors[name]}
        type={type}
      />
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleInput}
        error={errors[name]}
        options={options}
      />
    );
  }
}

export default Form;
