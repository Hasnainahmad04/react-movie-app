import React, { Component } from "react";
import Form from "./common/form";
import { loginUser } from "./services/login";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function withParams(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  render() {
    return (
      <div style={{ maxWidth: "40rem", margin: "auto" }}>
        <form autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="m-3">
            <h1>Login Form</h1>
            {this.renderInput("email", "email", "Email")}
            {this.renderInput("password", "password", "Passwsord")}
            {this.renderButton("login")}
          </div>
        </form>
      </div>
    );
  }
  afterSubmit = async () => {
    try {
      const { data } = this.state;
      await loginUser(data.email, data.password);
      this.props.navigate("/");
      toast("Login Succesfully");
    } catch (error) {
      console.log(error);
      const errors = { ...this.state.errors };
      toast(error.message);
      // errors.email = error.message;
      // this.setState({ errors });
    }
  };

  validiateForm = () => {
    const errors = {};

    const { email, password } = this.state.data;
    if (
      email.trim() === "" ||
      !email.includes("@") ||
      !email.endsWith(".com")
    ) {
      errors.email = "Please Enter A valid Email";
    }
    if (password.trim() === "" || password.length < 8) {
      errors.password = "Password Must be at least 8 charachter";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  validiateInput = ({ name, value }) => {
    if (name === "email") {
      if (
        value.trim() === "" ||
        !value.includes("@") ||
        !value.endsWith(".com")
      )
        return "Please Enter A valid Email";
    }
    if (name === "password") {
      if (value.trim() === "" || value.length < 8)
        return "Password Must be at least 8 charachter";
    }
  };
}
export default withParams(LoginForm);
