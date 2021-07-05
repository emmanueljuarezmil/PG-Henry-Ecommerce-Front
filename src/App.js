import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/Landing/Landing';
import SearchBar from './components/SearchBar/SearchBar'
import Home from './components/Home/Home';


function App() {
  return (
      <React.Fragment>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>

      </React.Fragment>
  );
}

export default App;
