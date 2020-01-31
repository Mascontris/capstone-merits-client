import url from '../../config'
import React, { Component } from 'react'
import { format } from 'date-fns'
//import { NavLink} from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import CircleButton from '../CircleButton/CircleButton'
import './ActionList.css'

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
        <ul className='Action__list'> 
        {this.props.actionList.map(action =>
          <li key={action.id} className='ActionPage__action'>
            <span className='Action__created'>
              <span className="Created">Created:</span> <span className='Created__date'>{format(action.created_at, 'MMM Do YYYY')}</span>
            </span>
            <span className='Action__description'>
            <span className="Created">Description:</span> <span className='Created__date'>{action.description}</span>
            </span>

            <button className='Action__delete' type='button' onClick={this.handleDelete(action.id)}>
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
              <p className="c">Delete</p>
            </button>
          </li>
        )}
      </ul>
    </div>
    )}
}
