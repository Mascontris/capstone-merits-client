import url from '../../config'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './AddKid.css'

export default class AddKid extends Component {

    static propTypes = {
        addKid: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            nameValue: "",
            dobValue: "",
            household: this.props.location.originHousehold
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ nameValue: event.target.value });
    }

    handleDobChange(event) {
        this.setState({ dobValue: event.target.value });
        
    }
    
    //Handle submit event to POST new kid
    handleSubmit(event) {
        event.preventDefault();
        var KidUrl = `${url}kids`;
        var data = {
            name: this.state.nameValue, 
            dob: this.state.dobValue, 
            household_id: this.state.household,
            current_stars: "0"
        }
        
        if (!data.name || !data.dob){
            this.setState({ errors: `Child's Name and Date of birth fields cannot be blank` })
        }
        else {
        fetch(KidUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                this.props.addKid(response)
                this.props.history.push(`/households/${data.household_id}`)
            })
            .catch(error => console.error('Error:', error));

        }
    }

    //render form to add child to household list, needs name and date of birth
    render() {
        return (
            <div>
                <span className="Create_kid_title">Create new child</span>
                    <form className='Create_kid_form' onSubmit={this.handleSubmit}>
                        <label className='Create_kid_label'>Child's name
                            <input className='Create_kid_input_name' type="text" name="nameValue" value={this.state.nameValue} onChange={this.handleNameChange} />
                        </label>
                        <label className='Create_kid_label'>Date of birth
                            <input className='Create_kid_input_dob' type="date" name="dobValue" value={this.state.dobValue} onChange={this.handleDobChange} />
                        </label>
                        <input className='submit' type="submit" value="Save" />
                        {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                    </form>
            </div>
        )
    }
}