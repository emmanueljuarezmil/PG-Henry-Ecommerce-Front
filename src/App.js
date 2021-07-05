import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';

import LandingPage from './components/Landing/Landing';

function App() {
  return (
      <React.Fragment>
        <Route path='/' component={LandingPage}/>
      </React.Fragment>
  );
}

export default App;
