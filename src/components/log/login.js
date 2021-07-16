import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'


export default function LoginButton (){
    const { isAuthenticated, loginWithPopup, getAccessTokenSilently } = useAuth0()
    
    return (
        !isAuthenticated && (
            <button onClick={() => loginWithPopup()}>
                Login
            </button>
        )
    )
}