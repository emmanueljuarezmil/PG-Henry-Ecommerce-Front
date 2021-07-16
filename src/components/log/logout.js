import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'


export default function LogoutButton (){
    const { logout, isAuthenticated, getAccessTokenSilently } = useAuth0()

    // async function testAuth0 () {
    //     const token = await getAccessTokenSilently()
    //     await axios.get('http://localhost:3000/', {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
        
    // }

    // async function Token (){
    //     const {getAccessTokenSilently} = useAuth0()
    //     const token = await getAccessTokenSilently()
    //     return token
    // }
    // const token = Token()
   
    return (
        isAuthenticated && (
            <button onClick={() => logout()}>
                logout
            </button>
        )
    )
}