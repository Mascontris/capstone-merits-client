import React from 'react'
import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
//import './KidPage.css'
//import dateformat from 'dateformat' ***unistall***

export default function KidList(props) {
  console.log("KidList.js loaded")
  
  if(!props.household) {
    return (
      <div>Loading Household</div>
    )
  }

  return (
    <div className='KidPage'>
        <h3 className='KidPage__household-name'>
        <ul>
        {props.kidList.map(kid =>
          <li key={kid.id} className='KidPage__kid-section'>
            <NavLink 
          className='Kid_Name'
          to={'/'+kid.name}>
            {kid.name}</NavLink><br></br>
            {kid.dob}<br></br>
            {(new Date(kid.dob)).toUTCString()}<br></br>
            {kid.current_stars}<br></br>
          </li>
        )}
      </ul>
        </h3>
    </div>
    )
}

KidList.defaultProps = {
  history: {
    goBack: () => {}
  }
}
