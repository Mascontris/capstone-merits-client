import url from '../config'
import React, { Component } from 'react' 
//import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ActionList from '../ActionList/ActionList'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import './Note.css'

export default class Kid extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       redirect: false,
  //   }};

  handleClick = (event) => {
    event.preventDefault();
    const KidUrl = `${url}/notes/${this.props.id}`;
    fetch(KidUrl, {
        method: 'DELETE', // or 'PUT'
    })
    .then( () => {
      window.location="/"})
    .catch(error => console.error('Error:', error)); 
}

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
      <h2 className='Kid__title'>
        {name}
      </h2>
      <button className='Kid__delete' type='button' onClick = {this.handleClick}>
          {/* <FontAwesomeIcon icon='trash-alt' /> */}
        remove
      </button>
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