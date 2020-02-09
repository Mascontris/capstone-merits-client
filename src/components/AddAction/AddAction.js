import url from '../../config'
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './AddAction.css'

export default class AddAction extends Component {

    static propTypes = {
        addAction: PropTypes.func.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            descValue: "",
            polarity: true,
        };   

        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDescChange(event) {
        this.setState({ descValue: event.target.value });
    }

    handleChange(polarity) {
        this.setState({ polarity });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        var KidUrl = `${url}actions`;
        var data = {
            description: this.state.descValue, 
            kid_id: this.props.kid.id, 
            polarity: this.state.polarity,
        }
        
        if (!data.description){
            this.setState({ errors: "description field cannot be blank" })
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
                this.props.history.push(`/kid/${this.props.kid.id}`)
            })
            .catch(error => console.error('Error:', error));

        }
    }

    render() {
        
        if(!this.props.kid) {
        return (
            <div></div>
        )}

        return (
            <div className='Create_action_container'>
                <span className='Create_action_title'>Create new action</span>
                <span className='Create_action_kidName'>{this.props.kid.name}</span>
                    <form className='Create_action_form' onSubmit={this.handleSubmit}>
                        <label className='Create_action_label'>Description</label>
                            <textarea className='Create_action_description' type="text"  value={this.state.descValue} onChange={this.handleDescChange} />
                            <input className='submit' type="submit" value="Save" />
                        {this.state.errors && <span className="Error__text">{this.state.errors}</span>}
                    </form>


{/* Generate animated radio button with face emote */}
    <div className="normal-container">    
        <div className="smile-rating-container">
            <div className="smile-rating-toggle-container">
                <form className="submit-rating">            
                    <input readOnly checked={!this.state.polarity} id="meh" name="satisfaction" type="radio" /> 
                    <input readOnly checked={this.state.polarity} id="fun" name="satisfaction" type="radio" /> 
                    <label htmlFor="meh" className="rating-label rating-label-meh" onClick={this.handleChange.bind(this, false)}>Bad</label>
            
                    <div className="smile-rating-toggle"></div>
                    
                    <div className="rating-eye rating-eye-left"></div>
                    <div className="rating-eye rating-eye-right"></div>
                    
                    <div className="mouth rating-eye-bad-mouth"></div>  
                    <div className="toggle-rating-pill"></div>
                
                    <label htmlFor="fun" className="rating-label rating-label-fun" onClick={this.handleChange.bind(this, true)}>Good</label>
                
                </form>
            </div>
        </div>
    </div>  

</div> 

        )
    }
}


