import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFilterName, setCategoryId, setOrder } from '../../Redux/Actions/index';
import Log from '../log/log';
import LogoNav from '../../img/LOGOnav.png';
import LogoLanding from '../../img/LOGOx2000.png';
import Cookies from 'universal-cookie';

import './Nav.css';

function Nav(fotoLanding) {
    const dispatch = useDispatch()
    const cookies = new Cookies()
    const admin = cookies.get('admin')
    let pathname = fotoLanding.location.pathname;

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
                <NavLink to='/'><img className='nav_logo_icon' src={pathname === '/' ? LogoLanding : LogoNav} alt="LogoNavbar" /></NavLink>
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