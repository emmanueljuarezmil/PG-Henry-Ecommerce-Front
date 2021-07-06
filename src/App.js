import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/Landing/Landing';

import SearchBar from './components/SearchBar/SearchBar';

import ProductDetail from './components/ProductDetail/ProductDetail'
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import FormProduct from './components/FormProduct/FormProduct';
import About from './components/About/About';
import User from './components/User/User';
import Nav from './components/Nav/Nav'


function App() {
  return (
      <React.Fragment>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/' component={Nav}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/product/:id' component={ProductDetail}/>
        <Route exact path='/admin/product' component={FormProduct}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/user_settings' component={User}/>
      </React.Fragment>
  );
}

export default App;
