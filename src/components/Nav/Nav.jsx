import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setFilterName, setCategoryId, setOrder } from '../../Redux/Actions/index';
import Log from '../log/log';
import ModoVintage from './ModoVintage.png';
import { useAuth0 } from '@auth0/auth0-react'
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

import './Nav.css';

function Nav() {
    const dispatch = useDispatch()
    // const { isAuthenticated, loginWithPopup } = useAuth0()
    const { isAuthenticated } = useAuth0()
    // const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(2);
    const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);
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
            <div className='desplegable'>
                <button {...buttonProps}>Iniciar sesión/registrarme</button>
                <div className={isOpen ? 'visible' : ''} role='menu'>
                    <NavLink {...itemProps[0]} to='/register'>Registrarse</NavLink>
                    <NavLink {...itemProps[1]} to='/login'>Iniciar sesión</NavLink>
                </div>
            </div>
            {
                !isAuthenticated && (
                    <div className='nav_item'>
                        <NavLink className="NavLink" to='/login'>Login/register</NavLink>
                    </div>
                )
            }
            {
                isAuthenticated && (
                    <div className='nav_item'>
                        <Log/>
                    </div> 
                )
            }
            <div className='nav_item'>
                <NavLink className="NavLink" to='/admin'>Admin</NavLink>
            </div>
        </div>
    )
}

export default Nav;