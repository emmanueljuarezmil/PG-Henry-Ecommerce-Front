import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFilterName, setCategoryId, setOrder } from '../../Redux/Actions/index';
import Log from '../log/log';
import ModoVintage from './ModoVintage.png';

import './Nav.css';

function Nav() {
    const dispatch = useDispatch()

    return (
        <div className='nav_container'>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/home' onClick={() => {
                    dispatch(setFilterName(''))
                    dispatch(setCategoryId(''))
                    dispatch(setOrder(''))
                }}>Inicio</NavLink>
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/about'>Nosotros</NavLink>
            </div>
            <div className='nav_item'>
                <h4>LOGO</h4>
            </div>
            <div className='nav_item'>
                <img className='modo_vintage_icon' src={ModoVintage} alt="ModoVintage" />
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/cart'>Carrito</NavLink>
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/user_settings'>Cuenta</NavLink>
            </div>
            <div className='nav_item'>
                <Log/>
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/admin'>Admin</NavLink>
            </div>
        </div>
    )
}

export default Nav;