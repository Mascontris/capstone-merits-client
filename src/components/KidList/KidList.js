import React from "react";
import url from "../../config";
import { NavLink, Link } from "react-router-dom";
import "./KidList.css";

export default function KidList(props) {
  const id = props.match.params.id;
  console.log("KidList.js loaded");

  function handleDelete(event) {
    event.preventDefault();
    var householdUrl = `${url}households/${id}`;
    //var data = { name: this.state.value }
    console.log("Delete Clicked");

    fetch(householdUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(props.history.push("/Login"), window.location.reload())
      .catch(error => console.error("Error:", error));
  }

  if (!props.kidList) {
    return <div>Loading Kids</div>;
  }

  return (
    <div className="KidList">
      <Link
        to={{
          pathname: "/add-kid",
          originHousehold: props.match.params.id
        }}
      >
        <button className="addKidButton">
          Add Kid
        </button>
      </Link>

      <button className="deleteHouseholdButton" onClick={handleDelete.bind()}>
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
              Current Merits: {kid.current_stars}
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
