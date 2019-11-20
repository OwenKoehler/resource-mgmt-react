import React from 'react';
import { setGlobal } from 'reactn';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/layout/Header';
import Profiles from './components/profiles/Profiles';
import ProfileDetails from './components/profiles/ProfileDetails';


import './App.css';

function App() {

  setGlobal({
    profiles: [],
    profile: {
      reviewer: "",
      rating: "",
      technologies: "",
      interviewDate: new Date(),
      email: "",
      profileProfileId: 0
    }
  });

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
      </div>
    </Router>
  );
}

export default App;
