import React,{useState} from 'react';
import {validate} from './validate';
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import {useHistory} from 'react-router-dom'
import './FormNewUser.css'
import axios from 'axios'
import { url } from '../../constantURL';
import Log from '../log/log.js'
import Cookies from 'universal-cookie';

function FormNewUser() {
    const [inputs,setInputs]=useState({repeat:''}); 
    const [errors,setErrors]=useState({});
    const [critic,setCritic]=useState(false);

     const history= useHistory();

    const handleChange= (e)=>{
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...inputs,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit=async (e)=>{
        e.preventDefault();
        setErrors(validate({
            ...inputs
        }))
        if(Object.values(errors).length===0){
            try{
                setCritic(false);
                const {email,userName,hashedPassword}=inputs
                const body={email,userName,hashedPassword};
                const response = await axios.post(`${url}/users/register`,body)
                const {id} = response.data
                const cookies = new Cookies();
                cookies.set('id', id, { path: '/' });
                alert('usuario creado con éxito.')
                history.push('/home')
            }catch(err) {
                console.error(err.response)
                alert(err.response.data.message);           
            }
        }else setCritic(true);
    }


    return (
        <div className='div_new_user'>
            <form onSubmit={(e)=>onSubmit(e)} className='form_new_user_container'>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Email: </label>
                        </div>                    
                        <input type='text' name='email' value={inputs.email} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.email}</p>
                </div>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Nombre de usuario: </label>
                        </div>    
                        <input type='text' name='userName' value={inputs.userName} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.userName}</p>
                </div>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Contraseña: </label>
                        </div>    
                        <input type='password' name='hashedPassword' value={inputs.hashedPassword} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.hashedPassword}</p>
                </div>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Repetir contraseña: </label>
                        </div>    
                        <input type='password' name='repeat' value={inputs.repeat} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.repeat}</p>
                </div>                
                {appear(critic,'Rellene todos los campos.')}
                <div className='button-cont'>
                    <button type='submit'>Registrarse</button>
                </div>
                
            <div className='google_button'>
            <Log type="register"/> 
            </div>           
            </form> 
        </div>
    )
}
const appear=(value,message)=>{
    if(value){
        return(
            <div className='critic_i'>
                <BsFillExclamationTriangleFill className='dangerIcon'/>
                <div className='critic'>

                    <p className='alert-text'>{message}</p>
                </div>                    

            </div>
        )
    }
}

export default FormNewUser
