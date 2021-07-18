import React from 'react'
// import FormNewUser from '../FormNewUser/FormNewUser'
import LoginButton from './login'
import LogoutButton from './logout'


export default function Log (props) {  
    // console.log(props.type)
    return (
            <>                
                <LoginButton type={props.type}/>         
                <LogoutButton/>
            </>            
    )
} 