import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'
import { localStorageCartToDB } from '../../Redux/Actions';

export let token;
export let idUser

export default function LoginButton (){
    const { isAuthenticated, loginWithPopup, user, getAccessTokenSilently } = useAuth0()
    const history = useHistory();
    const dispatch = useDispatch();
      
    useEffect(() => {
        return (async () => {
            if(user) {
                try {
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
                    idUser = await cookies.get('id')
                    console.log('Logueo, cookie id: ', idUser)
                    dispatch(localStorageCartToDB(idUser));
                    history.push('/home')
                } catch(err) {
                    console.error(err)                                          
                }
            }   
        })()
    }, [user, isAuthenticated, history, getAccessTokenSilently, dispatch]);
    
    return (            
        !isAuthenticated && (
            <button onClick={() => loginWithPopup()}>
            Iniciar sesión
            </button>
        )        
    )
}


