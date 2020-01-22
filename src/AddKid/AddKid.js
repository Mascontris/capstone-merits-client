import url from '../config'
import React, { Component } from 'react'
//import KidsList from '../KidsList/KidsList';
import PropTypes from 'prop-types';

export default class AddKid extends Component {

    static propTypes = {
        addKid: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            nameValue: '',
            dobValue: '',
            household: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDobChange = this.handleDobChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ nameValue: event.target.nameValue });
    }

    handleDobChange(event) {
        console.log(event.target.value)
        this.setState({ dobValue: event.target.dobValue });
        
    }

    handleSubmit(event) {
        event.preventDefault();
        var KidUrl = `${url}/kids`;
        var data = { kidName: this.state.nameValue, kidDob: this.state.dobValue }

        
        // if(this.props.folderId ){
        //     data.folderId = this.props.folderId
        // }
        if (!data.kidName){
            this.setState({ errors: "field cannot be blank" })
        }
        if (!data.kidDob){
            this.setState({ errors: "field cannot be blank" })
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
                this.props.history.push('/')
            })
            .catch(error => console.error('Error:', error));

        }
    }

    render() {
        console.log('AddKid.js loaded')
        console.log(this.props)
        return (
            <div>
                <h1>Add new child</h1>
                {/* <KidsList {...this.props} /> */}
                <form onSubmit={this.handleSubmit}>
                    <label>child's name:
                        <input type="text" name="nameValue" value={this.state.nameValue} onChange={this.handleNameChange} />
                    </label><br></br>
                    <label>child's Date of birth:
                        <input type="text" name="dobValue" value={this.state.dobValue} onChange={this.handleDobChange} />
                    </label>

                    <input type="submit" value="Submit" />
                    {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                </form>
                {JSON.stringify(this.state.nameValue)}
                <br></br>
                {JSON.stringify(this.state.dobValue)}

            </div>
        )
    }
}