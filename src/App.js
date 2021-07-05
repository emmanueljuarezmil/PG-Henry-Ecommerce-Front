import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';

import LandingPage from './components/Landing/Landing';
import SearchBar from './components/SearchBar/SearchBar'

function App() {
  return (
      <React.Fragment>
        <Route path='/' component={LandingPage}/>
        <Route path='/' component={SearchBar}/>
      </React.Fragment>
  );
}

export default App;
