import React from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'


export default function LogoutButton (){
    // const { logout, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const { logout, isAuthenticated } = useAuth0()
    const cookies = new Cookies()
    const id = cookies.get('id')
    const history = useHistory()

    // async function testAuth0 () {
    //     const token = await getAccessTokenSilently()
    //     await axios.get('http://localhost:3000/', {
    //         headers: {
    //             authorization: `Bearer ${token}`
    //         }
    //     })
        
    // }

    // async function Token (){        
    //     const token = await getAccessTokenSilently()
    //     return console.log(token)
    // }
    const clearsession = () => {
        const cookies = new Cookies()
        cookies.remove('id')
        if(isAuthenticated) logout()
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
                (isAuthenticated || id) && (
                    <button onClick={() => clearsession()}>
                        Logout
                    </button>
                )
            } 
        </div>       
    )
}