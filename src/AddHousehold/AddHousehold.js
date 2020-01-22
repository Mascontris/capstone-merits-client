import url from '../config'
import React, { Component } from 'react'
//import KidsList from '../KidsList/KidsList';
import PropTypes from 'prop-types';

export default class AddHousehold extends Component {

    static propTypes = {
        addHousehold: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            value: ``
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var householdUrl = `${url}/households`;
        var data = { householdName: this.state.value }

        // if(this.props.folderId ){
        //     data.folderId = this.props.folderId
        // }
        if (!data.householdName){
            this.setState({ errors: "field cannot be blank" })
        }
        else {
        fetch(householdUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                this.props.addHousehold(response)
                this.props.history.push('/')
            })
            .catch(error => console.error('Error:', error));

        }
    }

    render() {
        console.log('AddHousehold.js loaded')

        return (
            <div>
                <h1>Create new household</h1>
                {/* <KidsList {...this.props} /> */}
                <form onSubmit={this.handleSubmit}>
                    <label>Household name:
                    <input type="text" name="newFolder" value={this.state.value} onChange={this.handleChange} />
                    </label>

                    <input type="submit" value="Submit" />
                    {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                </form>
            </div>
        )
    }
}