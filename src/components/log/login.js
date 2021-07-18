import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import {url} from '../../constantURL'


export default function LoginButton (props){
    const { isAuthenticated, loginWithPopup, user } = useAuth0()
      
    useEffect(() => {
        if(user) {
            const body = {
                email: user.email,
                userName: user.name,
                hashedPassword: user.sub
            }
            axios.post(`${url}/users/register`, body)
        }
    }, [user])
    return (
        !isAuthenticated && (
            <button onClick={() => loginWithPopup()}>
                {props.type ? "Registrarse con Google" : "Iniciar sesión"}
            </button>
        )
    )
}