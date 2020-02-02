import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  render() {
    return (
        <div className='Landing_page'>
        <section className='LandingPage'>
        <h2>Parent Positive Reinforcement Tool</h2>
        </section>

        <section>
            <header>
                <h3>Keep track of good deeds</h3>
            </header>
            <p>Merits helps parents keep track of all the wonderful good things their kids are doing and rewards them when they have reached a set goal of good deeds.</p>
        </section>

        <section>
            <header>
                <h3>Create a household</h3>
            </header>
            <p>Create a new household for your family and add names of children you would like to reward. You can reward them for doing chores, being kind, or just for listening.</p>
        </section>

        <section>
            <header>
                <h3>Add child to household</h3>
            </header>
            <p>Add one or more children to household to keep track of their good deeds and actions.</p>
        </section>

        <section>
            <header>
                <h3>Add actions to keep track of</h3>
            </header>
            <p>Add actions that warrant a reward, collect a number of actions that can be redeemed for a prize.</p>
        </section>
    </div>
    )
  }
}