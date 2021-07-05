import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import ProductDetail from './components/ProductDetail/ProductDetail';

function App() {
  return (
      <React.Fragment>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/product/:id' component={ProductDetail}/>
      </React.Fragment>
  );
}

export default App;
