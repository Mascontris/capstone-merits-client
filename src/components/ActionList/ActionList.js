import url from '../../config'
import React, { Component } from 'react'
import { format } from 'date-fns'
//import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
//import './KidPage.css'

export default class ActionList extends Component {

  constructor(props) {
    super(props);

  this.handleDelete = this.handleDelete.bind(this)
  };

  handleDelete = actionId => (event) => {
    event.preventDefault();
    console.log("Remove action clicked")
    const ActionUrl = `${url}actions/${actionId}`;
    fetch(ActionUrl, {
        method: 'DELETE', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
      }
    })
    .then( () => {
      window.location.reload()})
    .catch(error => console.error('Error:', error)); 
}

render() {
    console.log("ActionList.js loaded")
    if(!this.props.actionList) {
      return (
        <div>Loading Actions</div>
      )
    }
    return (
    <div className='ActionPage'>
        <h3 className='ActionPage__kid-name'>
        <ul>
        {this.props.actionList.map(action =>
          <li key={action.id} className='KidPage__kid-section'>
            created: {format(action.created_at, 'MMM Do YYYY')}
            <br></br>
            action: {action.description}
            <br></br>
            <button className='Kid__delete' type='button' onClick={this.handleDelete(action.id)}>
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
              Delete action
            </button>
            <br></br><br></br>
          </li>
        )}
      </ul>
        </h3>
    </div>
    )}
}
