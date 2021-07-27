import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFilterName, setCategoryId, setOrder } from '../../Redux/Actions/index';
import Log from '../log/log';
import LogoNav from '../../img/LOGOnav.png';
import Cookies from 'universal-cookie';

import './Nav.css';

function Nav() {
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const admin = cookies.get('admin')

    return (
        <div className='nav_container'>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/home' onClick={() => {
                    dispatch(setFilterName(''))
                    dispatch(setCategoryId(''))
                    dispatch(setOrder(''))
                }}>Catalogo</NavLink>
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/about'>Nosotros</NavLink>
            </div>
            <div className='nav_item'>
                <NavLink to='/'><img className='nav_logo_icon' src={LogoNav} alt="ModoVintage" /></NavLink>
            </div>
            <div className='nav_item'>
                <h4>ModoVintage</h4>
            </div>
            <div className='nav_item'>
                <NavLink className="NavLink" to='/cart'>Carrito</NavLink>
            </div>
            {
                admin === 'true' ? <div className='nav_item'>
                    <NavLink className="NavLink" to='/admin'>Admin</NavLink>
                </div> :
                    null
            }
            <div className='nav_item'>
                <Log />
            </div>
        </div>
    )
};

export default Nav;