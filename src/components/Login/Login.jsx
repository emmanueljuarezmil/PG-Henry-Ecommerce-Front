import React from 'react'
import Log from '../log/log'
import './Login.css';


function Login() {

    return (
        <div className='init_cont'>
            <div className='google_login_btn'>
                <p>Iniciar sesión con tu cuenta de google</p>
                <div className='google_button_two'>
                    <Log/>
                </div> 
            </div> 
        </div>        
    )
}

export default Login
