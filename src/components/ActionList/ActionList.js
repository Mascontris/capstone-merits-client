import url from '../../config'
import React, { Component } from 'react'
import { format } from 'date-fns'
import './ActionList.css'

export default class ActionList extends Component {

  constructor(props) {
    super(props);

  this.handleDelete = this.handleDelete.bind(this)
  };

  //Handle DELETE fetch request to delete action
  handleDelete(event) {
    event.preventDefault();
    const ActionUrl = `${url}actions/${event.currentTarget.value}`;
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

//Render a list of actions and delete button
render() {
    if(!this.props.actionList) {
      return (
        <div>Loading Actions</div>
      )
    }
    return (
    <div className='ActionPage'>
        <ul className='Action__list'> 
        {this.props.actionList.map(action =>
          <li key={action.id} className={`ActionPage__action_${action.polarity}`}>
            <span className='Action__created'>
              <span className="Created">Created:</span> <span className='Created__date'>{format(action.created_at, 'MMM Do YYYY')}</span>
            </span>
            <span className='Action__description'>
            <span className="Created">Description:</span> <span className='Created__date'>{action.description}</span>
            </span>
          <div className="Action__delete_div">
            <button className='Action__delete' 
              onClick={(e) => window.confirm('Are you sure you want to delete?') && this.handleDelete(e)} value={action.id}>
              <p className="c">Delete</p>
            </button>
          </div>
          </li>
        )}
      </ul>
    </div>
    )}
}
