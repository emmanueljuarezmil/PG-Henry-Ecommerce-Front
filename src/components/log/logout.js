import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'
import {DBcartToLocalStorage} from '../../Redux/Actions'
import { useDispatch } from "react-redux";


export default function LogoutButton (){
    const { logout, isAuthenticated } = useAuth0()
    const history = useHistory()
    const dispatch = useDispatch()

    const clearsession = () => {
        const cookies = new Cookies()
        const idUser = cookies.get('id')
        if(isAuthenticated) logout()
        dispatch(DBcartToLocalStorage(idUser))
        cookies.remove('id')
        cookies.remove('admin')
        history.push('/')
    } 
   
    return (
        <div>
            {/* {
                isAuthenticated && (
                    <button onClick={() => logout()}>
                        Logout Auth
                    </button>
                )
            } */}
            {
                isAuthenticated  && (
                    <button onClick={() => clearsession()}>
                        Cerrar sesión
                    </button>
                )
            } 
        </div>       
    )
}