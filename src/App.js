import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Profiles from './components/profiles/Profiles';
import NewProfile from './components/profiles/NewProfile';
import Axios from "axios";


import './App.css';

class App extends React.Component {
  
  // Add Profile
  addProfile = profile => {
    Axios.post("/api", {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      about: profile.about,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/profiles">
            <Profiles addProfile={this.addProfile}/>
          </Route>  
          {/* <Route path="/newProfile" component={NewProfile}/>  */}
          {/* <Route exact path="/newProfile">
            <NewProfile addProfile={this.addProfile}/>
          </Route>   */}
        </div>
      </Router>
    );
  }
}

export default App;
