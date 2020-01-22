import React from 'react'
//import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
//import './KidPage.css'
//import dateformat from 'dateformat' ***unistall***

export default function ActionList(props) {
  console.log("ActionList.js loaded")
  if(!props.actionList) {
    return (
      <div>Loading Actions</div>
    )
  }

  return (
    <div className='KidPage'>
        <h3 className='KidPage__household-name'>
        <ul>
        {props.actionList.map(action =>
          <li key={action.id} className='KidPage__kid-section'>
            created: {action.created_at}
            <br></br>
            action: {action.description}
            <br></br><br></br>
          </li>
        )}
      </ul>
        </h3>
    </div>
    )
}

ActionList.defaultProps = {
  history: {
    goBack: () => {}
  }
}
