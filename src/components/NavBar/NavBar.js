import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import { getCookie } from "../../util"
import { findHousehold} from "../../merit-helpers"
import favicon from '../../img/favicon.png'
import houseIcon from '../../img/houseIcon.jpg'
import './NavBar.css'

export default function NavBar(props) {
    
  if(!props.households || props.households.length === 0) {
    return (
      <div className='NavBar'>
      <NavLink 
        className='Merits_link'
        to={'/'}>Merits Loading households...</NavLink>
    </div>
    )
  }

  function selectedHousehold() { 
    const foundHousehold = findHousehold(props.households, getCookie("currentHousehold"))
    if(foundHousehold) {
    return findHousehold(props.households, getCookie("currentHousehold")).id
  }}

  //renders top nav bar with link to merits root, currently selected household, list of households
  return (
    <ul className='NavBar'>
      <li className='Merits_link'>
        <NavLink 
          className='MeritsLink'
          to={'/'}
          onClick={ () => {props.addSelectedHousehold("") }}>
          <img className='favicon' src={favicon} alt='two kids' height="30px" width="30px"></img>
            <span className="Merits">Merits</span>
        </NavLink>
      </li>

      <li className='Household_name'>
        <Link 
        className='HouseholdLink'
        to={`/households/${selectedHousehold()}`}>
        {getCookie("currentHousehold")}
        </Link>
      </li>
        
      <li className="Households_link">
        <NavLink 
          className='HouseholdsLink'
          to={'/Login'}
          onClick={ () => {props.addSelectedHousehold("") }}>
            <span className='Households'>Households</span>
            <img className='houseIcon' src={houseIcon} alt='house' height="30px" width="30px"></img>
        </NavLink>
      </li>
      </ul>
    )
  }
