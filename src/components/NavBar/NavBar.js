import React from 'react'
import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {faAward} from '@fortawesome/free-solid-svg-icons'
import './NavBar.css'

export default function NavBar(props) {
     console.log("NavBar.js loaded")

  //Make sure props are loaded
  if(!props.households || props.households.length == 0) {
    return (
      <div className='NavBar'>
      <NavLink 
        className='Merits_link'
        to={'/'}>Merits </NavLink>
    </div>
    )
  }

    return (
      <div className='NavBar'>
        <NavLink 
          className='Merits_link'
          to={'/'}
          onClick={ () => {props.addSelectedHousehold("") }}>
            Merits
        </NavLink>
          
        <span className='Household_name'>
          {props.selectedHousehold}
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
