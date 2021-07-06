import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

import './Nav.css';

function Nav() {
    return (
        <div className='nav_container'>
            <div>
                <NavLink to='/home'>Inicio</NavLink>
            </div>
            <div>
                <NavLink to='/about'>Nosotros</NavLink>
            </div>
            <div>
                <h4>LOGO</h4>
            </div>
            <div>
                <button>Modo Vintage</button>
            </div>
            <div>
                <NavLink to='/admin/product'>ADMIN FORM</NavLink>
            </div>
            <div>
                <NavLink to='/cart'>Carrito</NavLink>
            </div>
            <div>
                <NavLink to='/user_settings'>Cuenta</NavLink>
            </div>
            <div>
                <SearchBar />
            </div>
        </div>
    )
}

export default Nav;