import React from "react";
import url from "../../config";
import { NavLink, Link } from "react-router-dom";
import { calculateCurrentStars, getActionsForKid } from '../../merit-helpers'
import { setCookie } from "../../util"
import "./KidList.css";

export default function KidList(props) {
  const id = props.match.params.id;

  //handles the DELETE fetch method
  function handleDelete(event) {
    event.preventDefault();
    var householdUrl = `${url}households/${id}`;

    fetch(householdUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(setCookie("currentHousehold", ""))
      .then(props.history.push("/Login"), window.location.reload())
      .catch(error => console.error("Error:", error));
  }

  if (!props.kidList) {
    return <div>Loading Kids</div>;
  }

  //Renders a list of kids and a delete household button
  return (
    <div className="KidList">
      <Link
        to={{
          pathname: "/add-kid",
          originHousehold: props.match.params.id
        }}
      >
        <button className="addKidButton">
          Add Child
        </button>
      </Link>

      <button className="deleteHouseholdButton" onClick={(e) => window.confirm('Are you sure you want to delete?') && handleDelete(e)}>
        Delete Household
      </button>

      <span className='Kid__title'>Children</span>

      <ul className="KidList__kid_list">
        {props.kidList.map(kid => (
          <li key={kid.id} className="KidList__kid-section">
            <NavLink className="Kid_Name" to={"/kid/" + kid.id}>
              {kid.name}
            </NavLink>
            <span className="KidList_merits">
              Current Merits: {calculateCurrentStars(getActionsForKid(props.actionList, kid))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

KidList.defaultProps = {
  history: {
    goBack: () => {}
  }
};
