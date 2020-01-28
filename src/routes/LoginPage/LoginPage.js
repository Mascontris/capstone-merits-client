import React, { Component } from "react";
import HouseholdList from "../../components/HouseholdList/HouseholdList";
import { Link } from "react-router-dom";
import './LoginPage.css'

export default class LoginPage extends Component {
  render() {
    if (!this.props.households) {
      return <div>Loading Households</div>;
    }

    return (
      <section className="Households_page">
        <Link to="/add-household">
          <button className="Create_household_button">Create New Household</button>
        </Link>
        <br></br>
        <span className="Household_title">Households</span>
        <br></br>
 
        <HouseholdList
          households={this.props.households}
          addSelectedHousehold={this.props.addSelectedHousehold}
        />
      </section>
    );
  }
}
