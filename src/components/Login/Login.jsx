import React,{useState} from 'react'
import Log from '../log/log'
import axios from 'axios'
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';
import {useHistory} from 'react-router-dom'

import './Login.css';

const backUrl = url

function Login() {
    const [inputs,setInputs]=useState({});
    const history = useHistory()

    const handleChange= (e)=>{
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const body = inputs
        try{
            const {data} = await axios.post(`${backUrl}/users/login`, body);
            const {id} = data
            const cookies = new Cookies();
            cookies.set('id', id, { path: '/' });
            history.push('/home')
        }catch(err){
            console.error(err)
            alert('Datos incorrectos')
        };
    }

    return (
        <div className='init_cont'>
            <div className='form_login_container'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>E-mail: </label>
                            <input className='inputName' type='text' name='email' value={inputs.email} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Contraseña: </label>
                            <input className='inputName' type='password' name='hashedPassword' value={inputs.hashedPassword} onChange={handleChange}/>
                        </div>
                    </div>
                    <button className='login_button' type='submit'>Ingresar</button>
                </form>
            </div>
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
