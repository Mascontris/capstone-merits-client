import React from 'react'
import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
//import { countNotesForFolder } from '../notes-helpers'
import './NavBar.css'

export default function NavBar(props) {
     console.log("NavBar.js loaded")
  if(!props.householdName) {
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
          to={'/'}>Merits </NavLink>
          {props.householdName.name}
      </div>
    )
  }

NavBar.defaultProps = {
  folders: []
}
