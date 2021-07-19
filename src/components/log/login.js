import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'


export default function LoginButton (props){
    // const { isAuthenticated, loginWithPopup, getAccessTokenSilently } = useAuth0()
    const { isAuthenticated, loginWithPopup } = useAuth0()
    // console.log(props.type)
    return (
        !isAuthenticated && (
            <button onClick={() => loginWithPopup()}>
                {props.type ? "Registrarse con Google" : "Iniciar sesión"}
            </button>
        )
    )
}