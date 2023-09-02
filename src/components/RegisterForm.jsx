import React, { Component } from "react";
import { registerUser } from "./services/user";
import Form from "./common/form";

class Register extends Form {
  state = {
    data: { username: "", email: "", password: "", name: "" },
    errors: {},
  };
  render() {
    return (
      <div style={{ maxWidth: "40rem", margin: "auto" }}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="m-3">
            <h1>Register Form</h1>
            {this.renderInput("text", "name", "Name")}
            {this.renderInput("text", "username", "Username")}
            {this.renderInput("email", "email", "Email")}
            {this.renderInput("password", "password", "Password")}
            {this.renderButton("Register")}
          </div>
        </form>
      </div>
    );
  }
  validiateForm = () => {
    const errors = {};

    const { username, password, name, email } = this.state.data;

    if (username.trim() === "" || username.length < 4) {
      errors.username = "Username Must be at least 4 charachter";
    }
    if (
      email.trim() === "" ||
      !email.includes("@") ||
      !email.endsWith(".com")
    ) {
      errors.email = "Enter a valid Email Address";
    }
    if (password.trim() === "" || password.length < 8) {
      errors.password = "Password Must be at least 8 charachter";
    }
    if (name.trim() === "" || name.length < 4) {
      errors.password = "Name Must be at least 4 charachter";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validiateInput = (input) => {
    if (input.name === "username") {
      if (input.value.trim() === "" || input.value.length < 4)
        return "Username Must be at least 4 charachter";
    }
    if (input.name === "email") {
      if (
        input.value.trim() === "" ||
        !input.value.includes("@") ||
        !input.value.endsWith(".com")
      )
        return "Enter a valid Email Address";
    }
    if (input.name === "password") {
      if (input.value.trim() === "" || input.value.length < 8)
        return "Password Must be at least 8 charachter";
    }
    if (input.name === "name") {
      if (input.value.trim() === "" || input.value.length < 4)
        return "Name Must be at least 4 charachter";
    }
  };
  afterSubmit = async () => {
    try {
      await registerUser(this.state.data);
    } catch (error) {
      if (error.message === "User already exists") {
        const errors = { ...this.state.errors };
        errors.email = error.message;
        return this.setState({ errors });
      }
    }
  };
}

export default Register;
