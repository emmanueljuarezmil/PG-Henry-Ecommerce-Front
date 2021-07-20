import './App.css';
import {Route} from 'react-router-dom';
import React from 'react';
import LandingPage from './components/Landing/Landing';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Home from './components/Home/Home';
import Cart from './components/AllCart/Cart.jsx';
import FormProduct from './components/FormProduct/FormProduct';
import About from './components/About/About';
import User from './components/User/User';
import Nav from './components/Nav/Nav';
import FormCategories from './components/FormCategories/FormCategories';
import Admin from './components/Admin/Admin';
import OrderAdmin from './components/OrderAdmin/OrderAdmin';
import FormNewUser from './components/FormNewUser/FormNewUser';
import Login from './components/Login/Login';


function App() {
  return (
      <React.Fragment>
        <Route path='/' component={Nav}/>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/product/:id' component={ProductDetail}/>
        <Route exact path='/admin/product' component={FormProduct}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/cart' component={Cart}/>
        <Route exact path='/user_settings' component={User}/>
        <Route exact path='/admin/category' component={FormCategories}/>
        <Route exact path='/admin' component={Admin}/>
        <Route exact path='/admin/orders' component={OrderAdmin}/>
        <Route exact path='/register' component={FormNewUser}/>
        <Route exact path='/login' component={Login}/>
      </React.Fragment>
  );
}

export default App;
