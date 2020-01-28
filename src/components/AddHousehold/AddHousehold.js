import url from "../../config";
import React, { Component } from "react";
import PropTypes from "prop-types";
import "./AddHousehold.css";

export default class AddHousehold extends Component {
  static propTypes = {
    addHousehold: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      errors: "",
      value: ``
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    var householdUrl = `${url}households`;
    var data = { name: this.state.value };

    if (!data.name) {
      this.setState({ errors: "field cannot be blank" });
    } else {
      fetch(householdUrl, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => {
          this.props.addHousehold(response);
          this.props.history.push("/Login");
        })
        .catch(error => console.error("Error:", error));
    }
  }

  render() {
    console.log("AddHousehold.js loaded");

    return (
      <div className="Create_household_page">
        <span className="Create_household_title">Create new household</span>
        <form onSubmit={this.handleSubmit}>
          <label className="Create_household_label">
            Household name:
            <input
              type="text"
              name="newHousehold"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" className="submit" value="Submit" />
          {this.state.errors && (
            <span className="Error__text">{this.state.errors}</span>
          )}
        </form>
      </div>
    );
  }
}
