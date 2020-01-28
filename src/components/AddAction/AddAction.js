import url from '../../config'
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class AddAction extends Component {

    static propTypes = {
        addAction: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            descValue: "",
            kid: this.props.location.originKid,
            polarity: ""
        };   

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleGoodChange = this.handleGoodChange.bind(this);
        this.handleBadChange = this.handleBadChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDescChange(event) {
        this.setState({ descValue: event.target.value });
    }

    handleGoodChange() {
        this.setState({ polarity: true });
        
    }

    handleBadChange() {
        this.setState({ polarity: false });
        
    }
    
    handleSubmit(event) {
        event.preventDefault();
        var KidUrl = `${url}actions`;
        var data = {
            description: this.state.descValue, 
            kid_id: this.state.kid.id, 
            polarity: this.state.polarity,
        }
        
        if (!data.description){
            this.setState({ errors: "description name field cannot be blank" })
        }

        else {
        fetch(KidUrl, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            //(this.props)?console.log(this.props.location):""
            .then(response => {
                this.props.addAction(response)
                this.props.history.push(`/${this.state.kid.name}`)
            })
            .catch(error => console.error('Error:', error));

        }
    }

    render() {
        console.log(this.state.kid)
        return (
            <div>
                {this.state.kid.name}
                <br></br>
                Add Action
                <br></br>
                <button className="good" onClick={this.handleGoodChange}>
                    Good
                </button>
                <button className="bad" onClick={this.handleBadChange}>
                    Bad
                </button>
                    <form onSubmit={this.handleSubmit}>
                        <label>Describe action:
                            <input type="text" name="nameValue" value={this.state.descValue} onChange={this.handleDescChange} />
                        </label><br></br>
                        <input type="submit" value="Submit" />
                        {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                    </form>
            </div>
        )
    }
}