import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/Landing/Landing';
import ProductDetail from './components/ProductDetail/ProductDetail'
import Home from './components/Home/Home';
import FormProduct from './components/FormProduct/FormProduct';


function App() {
  return (
      <React.Fragment>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/product/:id' component={ProductDetail}/>
        <Route exact path='/admin/product' component={FormProduct}/>
      </React.Fragment>
  );
}

export default App;
