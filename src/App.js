import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Profiles from './components/profiles/Profiles';
import ProfileDetails from './components/profiles/ProfileDetails';


import './App.css';

class App extends React.Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Route exact path="/profiles">
            <Profiles/>
          </Route>
          <Route exact path="/profile/:profileId">
            <ProfileDetails/>
          </Route>  
          {/* <Route path="/newProfile" component={NewProfile}/>  */}
        </div>
      </Router>
    );
  }
}

export default App;
