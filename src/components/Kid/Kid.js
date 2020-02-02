import url from '../../config'
import React, { Component } from 'react' 
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActionList from '../ActionList/ActionList'
import { calculateCurrentStars } from '../../merit-helpers'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Kid.css'

export default class Kid extends Component {

  constructor(props) {
    super(props);

  this.handleDelete = this.handleDelete.bind(this)
  };

  handleDelete = (event) => {
    event.preventDefault();
    console.log("Remove Kid clicked")
    const KidUrl = `${url}kids/${this.props.kid.id}`;
    fetch(KidUrl, {
        method: 'DELETE', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
      }
    })
    .then( () => {
      window.location=`/households/${this.props.kid.household_id}`})
    .catch(error => console.error('Error:', error)); 
}

render() {
  console.log('Kid.js loaded')
  if(!this.props.kid || !this.props.actionList) {
    return (
      <div>Actions loading</div>
    )
  }
  const { name, dob, kidId } = this.props.kid

  return (
    <div className='Kid'>
      <button className='Kid__delete' type='button' onClick={this.handleDelete}>
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
        Remove Child
      </button>
      
      <div className='Kid__info'>
      <span className='Kid__name'>{name}</span>
        <div className='Kid__dob'>
          Date of birth: {format(dob, 'MMM Do YYYY')}
          {' '}
        </div>
        <div className='Kid__merits'>
          Current merits: {calculateCurrentStars(this.props.actionList)}
        </div>
      </div>
      <main>

      <Link to={{
        pathname: `/kid/${this.props.kid.id}/add-action`,
        originKid: this.props.kid
      }}>
          <button className='Action__add' type='button'>
            Add Action
          </button>
      </Link>

        <div className='Action__list'>
            <ActionList
                kidId = {kidId}
                actionList = {this.props.actionList}
            />
        </div>
      </main>
    </div>
  )
}
}