import React, {useEffect} from 'react';
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios';
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'

export default function LoginButton (props){
    const { isAuthenticated, loginWithPopup, user } = useAuth0()
    const cookies = new Cookies()
    const id = cookies.get('id')
    const history = useHistory()
      
    useEffect(() => {
        console.log('useeffect')
        return (async () => {
            if(user) {                                               
                const body = {
                    email: user.email,
                    userName: user.name,
                    hashedPassword: user.sub
                }
                try {
                    const response = await axios.post(`${url}/users/login`, body)
                        console.log(response)
                        const {id, admin} = response.data
                        const cookies = new Cookies();
                        cookies.set('id', id, { path: '/' });
                        if(admin) cookies.set('admin', admin, { path: '/' })
                        history.push('/home')
                } catch(err) {
                    console.error(err)
                }
                // axios.post(`${url}/users/register`, body).then(response => {
                //     console.log(response)
                //     const {id} = response.data
                //     const cookies = new Cookies();
                //     cookies.set('id', id, { path: '/' });
                //     history.push('/home')
                // }).catch(err => console.error(err))
            }   
        })()
    }, [user, isAuthenticated, history  ])
    return (            
        !isAuthenticated && !id && (
            <button onClick={() => loginWithPopup()}>
            {props.type ? "Registrarse con Google" : "Iniciar sesión"}
            </button>
        )        
    )
}