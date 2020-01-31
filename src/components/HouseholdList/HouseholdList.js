import React from "react";
import { NavLink } from "react-router-dom";
import "./HouseholdList.css";

export default function HouseholdList(props) {
  console.log("HouseholdList.js loaded");
  if (!props.households) {
    return <div>Loading Households</div>;
  } 

  return (
    <div className="HouseholdList">
      <ul className="HouseholdList__list">
        {props.households.map(household => (
          <li key={household.id}>
            <NavLink
              className="HouseholdList__link"
              to={`/households/${household.id}`}
              selectedhousehold={household.id}
              onClick={() => {
                props.addSelectedHousehold(household.name)
              }}
            >
              {household.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
