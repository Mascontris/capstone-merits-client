import url from '../config'
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavBar from '../NavBar/NavBar'
import KidList from '../KidList/KidList'
import Kid from '../Kid/Kid'
import AddHousehold from '../AddHousehold/AddHousehold'
import AddKid from '../AddKid/AddKid'
//import logo from '../logo.svg';
import {getKidsForHousehold, findKid, findHousehold, getActionsForKid} from '../merit-helpers';
//import './App.css';
//import ErrorBoundary from '../Error'

class App extends Component {
  state = {
      username: [],
      password: [],
      households: [],
      loggedInHousehold: 3,
      kids: [],
      actions: [],
  }

  componentDidMount() {
      this.loadData()
  };

 fetchData(endpoint) {
  return fetch(`${url}${endpoint}`).then(res => res.json())
  };

  loadData() {

    const fetchArray = ["households", "kids", "actions"]

    const fetchRequests = fetchArray.map(endpoint => this.fetchData(endpoint)) 
    Promise.all(fetchRequests)
      .then(resultsArray => {
          console.log(resultsArray)
          const updatedState = fetchArray.reduce((acc, key, index) => {
            acc[key] = resultsArray[index]
            return acc
          }, {})
          return updatedState
        })
      .then(updatedState => this.setState(updatedState))
      .catch(error => console.error(`Error:`, error))

      

      // fetch(`${url}/households`).then(res => res.json())
      // .then(response => this.setState({households: response}))
      // .catch(error => console.error('Error:', error))
      // fetch(`${url}/kids`).then(res => res.json())
      // .then(response => this.setState({kids: response}))
      // .catch(error => console.error('Error:', error))
      // fetch(`${url}/actions`).then(res => res.json())
      // .then(response => this.setState({actions: response}))
      // .catch(error => console.error('Error:', error))
  };

  addHousehold = (household) => {this.setState({households: [...this.state.households, household]})}
  addKid = (kid) => {this.setState({kids: [...this.state.kids, kid]})}
  addAction = (action) => {this.setState({actions: [...this.state.actions, action]})}


  renderNavBar() {
    const {households, loggedInHousehold} = this.state;
    const householdName = findHousehold(households, loggedInHousehold)
    return (
        <Route
          exact
          render={routeProps => (
            <NavBar 
              householdName={householdName}
              {...routeProps} />
          )}
        />
    )
}

  renderHouseholdRoutes() {
      const {households, kids, actions, loggedInHousehold} = this.state;
      
      return (
          <>
            <Route
              exact path="/"
              render={routeProps => {
                //const {id}=routeProps.match.params;
                const household=findHousehold(households, loggedInHousehold);
                const kidList=getKidsForHousehold(kids, loggedInHousehold);
                return <KidList {...routeProps} household={household} kidList={kidList}/>;
              }}
            />

            <Route
              path="/:kid_name"
              render={routeProps => {
                const {kid_name} = routeProps.match.params;
                const kid = findKid(kids, kid_name);
                const actionList=getActionsForKid(actions, kid)
                return <Kid {...routeProps} kid={kid} actionList={actionList}/>;
              }}
            />

            <Route path="/add-household" 
              render={routeProps => {
              return <AddHousehold {...routeProps} addHousehold={this.addHousehold} />
              }} 
            />

            <Route path="/add-kid" 
                render={routeProps => {
                return <AddKid {...routeProps} addNote={this.addNote} folderId={routeProps.match.params.folderId} folders={this.state.folders} />
              }}
            />

          </>
      );
  }

  renderMainRoutes() {
      const { kids } = this.state;
      return (
          <>
              {['/:name'].map(path => (
                  <Route
                      exact
                      key={path}
                      path={path}
                      render={routeProps => {
                          const {householdId} = routeProps.match.params;
                          const kidsForHousehold = getKidsForHousehold(
                              kids,
                              householdId
                          );
                          return (
                              <KidList
                                  {...routeProps}
                                  kids={kidsForHousehold}
                                  //loadData={this.loadData}
                              />
                          );
                      }}
                  />
              ))}
              
              <Route
                  path="/:kid_name"
                  render={routeProps => {
                      const {kidId} = routeProps.match.params;
                      const kid = findKid(kids, kidId);
                      console.log("kid Route loaded")
                      return <KidList {...routeProps} kid={kid}/>;
                  }}
              />
              {/* <Route path="/add-note" 
                  render={routeProps => {
                  return <AddKid {...routeProps} addNote={this.addNote} folderId={routeProps.match.params.folderId} folders={this.state.folders}/>}} />
              
              <Route path="/folders/:folderId/add-note" 
                  render={routeProps => {
                  return <AddNote {...routeProps} addNote={this.addNote} folderId={routeProps.match.params.folderId} folders={this.state.folders}/>}} />     */}
          </>
      );
  }

  render() {
      return (
          //<ErrorBoundary>
          <div className="App">
            <nav className="App__nav">{this.renderNavBar()}</nav>
              <header className="App__header">
                  {/* <h1>
                      <Link to="/">Header</Link>{' '}
                  </h1> */}
              </header>
              <main className="App__main">
                {this.renderHouseholdRoutes()}
                {/* {this.renderMainRoutes()} */}
              </main>
          </div>
          //</ErrorBoundary>
      );
  }
}

export default App;
