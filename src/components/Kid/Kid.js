import url from '../../config'
import React, { Component } from 'react' 
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActionList from '../ActionList/ActionList'
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

// handleClick = (event) => {
//   event.preventDefault();
//   const KidUrl = `${url}//${this.props.id}`;
//   fetch(KidUrl, {
//       method: 'POST',
//   })
//   .then( () => {
//     window.location="/"})
//   .catch(error => console.error('Error:', error)); 
// }

render() {
  console.log('Kid.js loaded')
  if(!this.props.kid || !this.props.actionList) {
    return (
      <div></div>
    )
  }
  const { name, dob, current_stars, kidId } = this.props.kid
  return (
    <div className='Kid'>
      <span className='Kid__name'>{name}</span>
      <br></br>
      <button className='Kid__delete' type='button' onClick={this.handleDelete}>
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
        Remove Kid
      </button>
      
      <Link to={{
        pathname: '/add-action',
        originKid: this.props.kid
      }}>
          <button className='Kid__add' type='button'>
            Add Action
          </button>
      </Link>
      
      <div className='Kid__dob'>
        <div className='Note__dates-modified'>
          Date of birth: {format(dob, 'MMM Do YYYY')}
          {' '}
        </div>
        <div className='Kid__stars'>
          Current stars: {current_stars}
        </div>
      </div>
      <main>
        <div>
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