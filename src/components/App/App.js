import url from "../../config";
import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import LandingPage from "../../routes/LandingPage/LandingPage"
import LoginPage from "../../routes/LoginPage/LoginPage"
import KidList from "../KidList/KidList";
import Kid from "../Kid/Kid";
import AddHousehold from "../AddHousehold/AddHousehold";
import AddKid from "../AddKid/AddKid";
import AddAction from "../AddAction/AddAction";
import { setCookie } from "../../util"
import './App.css'
import {
  getKidsForHousehold,
  findKid,
  getActionsForKid
} from "../../merit-helpers";

class App extends Component {
  state = {
    username: [],
    password: [],
    households: [],
    selectedHousehold: '',
    kids: [],
    actions: []
  };

  componentDidMount() {
    this.loadData();
  }

  fetchData(endpoint) {
    return fetch(`${url}${endpoint}`).then(res => res.json());
  }

  //load data from postgreSQL database
  loadData() {
    const fetchArray = ["households", "kids", "actions"];
    const fetchRequests = fetchArray.map(endpoint => this.fetchData(endpoint));

    Promise.all(fetchRequests)
      .then(resultsArray => {
        const updatedState = fetchArray.reduce((acc, key, index) => {
          acc[key] = resultsArray[index];
          return acc;
        }, {});
        return updatedState;
      })
      .then(updatedState => this.setState(updatedState))
      .catch(error => console.error(`Error:`, error));
  }

  //Set list of households to state
  addHousehold = household => {
    this.setState({ households: [...this.state.households, household] });
  };
  //Set list of kids to state
  addKid = kid => {
    this.setState({ kids: [...this.state.kids, kid] });
  };
  //set list of actions to state
  addAction = action => {
    this.setState({ actions: [...this.state.actions, action] });
  };

  //set currently selected household to local brower cookie
  addSelectedHousehold = name => {
    setCookie("currentHousehold", name, 30)
  }

  renderNavBar() {
    const { households, selectedHousehold } = this.state;
    return (
          <NavBar addSelectedHousehold={this.addSelectedHousehold} selectedHousehold={selectedHousehold} households={households} />
          )
  }

  renderMainRoutes() {
    const { households, kids, actions } = this.state;

    return (
      <>
        <Route
          exact
          path="/"
          render={routeProps => {
            return (
              <LandingPage
                {...routeProps}
              />
            );
          }}
        />  

        <Route
          exact
          path="/Login"
          render={routeProps => {
            return (
              <LoginPage
                {...routeProps}
                households={households}
                addSelectedHousehold = {this.addSelectedHousehold}
              />
            );
          }}
        /> 

        <Route
          exact path="/households/:id"
          render={routeProps => {
            const { id }=routeProps.match.params;
            const kidList=getKidsForHousehold(kids, id);
            return <KidList {...routeProps} kidList={kidList} actionList={this.state.actions}/>
          }}
        />

        <Route
          exact path="/kid/:kid_id"
          render={routeProps => {
            const { kid_id } = routeProps.match.params;
            const kid = findKid(kids, kid_id);
            const actionList = getActionsForKid(actions, kid);
            return <Kid {...routeProps} kid={kid} actionList={actionList} />
          }}
        />

        <Route
          path="/add-household"
          render={routeProps => {
            return (
              <AddHousehold {...routeProps} addHousehold={this.addHousehold} />
            );
          }}
        />

        <Route
          path="/add-kid"
          render={routeProps => {
            return (
              <AddKid
                {...routeProps}
                addKid = {this.addKid}
              />
            );
          }}
        />
        
        <Route
          exact path="/kid/:kid_id/add-action"
          render={routeProps => {
            const { kid_id } = routeProps.match.params;
            const kid = findKid(kids, kid_id);
            return (
              <AddAction
                {...routeProps}
                addAction = {this.addAction}
                kid = {kid}
              />
            );
          }}
        />

      </>
    );
  }

  render() {
    return (
      
      <div className="App">
        <nav className="App__nav">{this.renderNavBar()}</nav>
        <main className="App__main">
          <BrowserRouter>
            {this.renderMainRoutes()}
          </BrowserRouter>
        </main>
      </div>
    );
  }
}

export default App;
