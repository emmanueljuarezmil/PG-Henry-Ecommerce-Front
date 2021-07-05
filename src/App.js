import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/Landing/Landing';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Home from './components/Home/Home';


function App() {
  return (
      <React.Fragment>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/product/:id' component={ProductDetail}/>
      </React.Fragment>
  );
}

export default App;
