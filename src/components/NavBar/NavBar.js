import React from 'react'
import { NavLink, Link} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {faAward} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'
import { getCookie } from "../../util"
import { findHousehold} from "../../merit-helpers"

export default function NavBar(props) {
     console.log("NavBar.js loaded")
     //Make sure props are loaded
    
  if(!props.households || props.households.length === 0) {
    return (
      <div className='NavBar'>
      <NavLink 
        className='Merits_link'
        to={'/'}>Merits </NavLink>
    </div>
    )
  }

  function selectedHousehold() { 
    const foundHousehold = findHousehold(props.households, getCookie("currentHousehold"))
    if(foundHousehold) {
    return selectedHousehold = findHousehold(props.households, getCookie("currentHousehold")).id
  }}

  return (
      <div className='NavBar'>
        <NavLink 
          className='Merits_link'
          to={'/'}
          onClick={ () => {props.addSelectedHousehold("") }}>
            Merits
        </NavLink>

        <span >
          <Link 
          to={`/households/${selectedHousehold()}`}
          className='Household_name'
          >
          {getCookie("currentHousehold")}
          </Link>
        </span>
        

        <span className="Households">
          <NavLink 
            className='Households_link'
            to={'/Login'}
            onClick={ () => {props.addSelectedHousehold("") }}>
              Households
          </NavLink>
        </span>
      </div>
    )
  }
