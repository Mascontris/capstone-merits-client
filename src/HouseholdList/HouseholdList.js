import React from 'react'
import { NavLink, Link } from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
//import { countNotesForFolder } from '../notes-helpers'
import './HouseholdList.css'

export default function HouseholdList(props) {
   //if (props.loadData && props.location && props.location.state.loadData) {
     //props.location.state.loadData = false
     //props.loadData()
     //}
     console.log("HouseholdList.js loaded")
  return (
    <div className='HouseholdList'>
      <ul className='HouseholdList__list'>
        {props.households.map(household =>
          <li key={household.id}>
            <NavLink
              className='HouseholdList__link'
              to={`/households/${household.id}`}
            >
              <span className='HouseholdList__num-kids'>
                {/* {countNotesForFolder(props.notes, folder.folderId)} */}
              </span>
              {household.name}
            </NavLink>
          </li>
        )}
      </ul>
      <div className='HouseholdList__button-wrapper'>
        {/* <CircleButton
          tag={Link}
          to='/add-folder'
          type='button'
          className='NoteListNav__add-folder-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Folder
        </CircleButton> */}
      </div>
    </div>
  )
}

HouseholdList.defaultProps = {
  folders: []
}
