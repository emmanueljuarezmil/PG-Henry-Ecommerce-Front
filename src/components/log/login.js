import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'

export let token;

export default function LoginButton (){
    const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } = useAuth0()
    const history = useHistory()
      
    useEffect(() => {
        return (async () => {
            if(user) {
                try {
                    console.log(user)
                    token = await getAccessTokenSilently()
                    const headers = {
                        authorization: `Bearer ${token}`,
                        email: user.email,
                        userName: user.name,
                        hashedPassword: user.sub
                    }
                    const response = await axios(`${url}/users/login`, {headers})
                    const {id, admin} = response.data                        
                    const cookies = new Cookies();
                    cookies.set('id', id, { path: '/' });
                    cookies.set('admin', admin, { path: '/' })
                } catch(err) {
                    console.error(err)                                          
                }
            }   
        })()
    }, [user, isAuthenticated, history, getAccessTokenSilently])
    
    return (            
        !isAuthenticated && (
            <button onClick={() => loginWithPopup()}>
            Iniciar sesión
            </button>
        )        
    )
}


