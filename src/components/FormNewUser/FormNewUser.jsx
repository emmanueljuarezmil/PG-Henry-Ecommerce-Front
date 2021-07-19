import React,{useState} from 'react';
import {validate} from './validate';
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
import {useHistory} from 'react-router-dom'
import './FormNewUser.css'
import axios from 'axios'
import { url } from '../../constantURL';
import Log from '../log/log.js'

function FormNewUser() {
    const [inputs,setInputs]=useState({repeat:''}); 
    const [errors,setErrors]=useState({});
    const [critic,setCritic]=useState(false);
    const [alreadyE,setAlreadyE]=useState(false);
    const [alreadyM,setAlreadyM]= useState('');

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
            const {email,userName,hashedPassword}=inputs
            const body={email,userName,hashedPassword};
            setCritic(false)
            try{                
                await axios.post(`${url}/users/register`,body)
                alert('usuario creado con éxito.')
                history.push('/home')
            }catch(err) {
                console.error(err.response)
                setAlreadyM(err.response.data.message);
                setAlreadyE(true)                
            }
        }else setCritic(true);setAlreadyE(false);
    }


    return (
        <div>
            <form onSubmit={(e)=>onSubmit(e)} className='containeer'>
                {appear(alreadyE,alreadyM)}
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
                        <label>Username: </label>
                        </div>    
                        <input type='text' name='userName' value={inputs.userName} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.userName}</p>
                </div>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Password: </label>
                        </div>    
                        <input type='password' name='hashedPassword' value={inputs.hashedPassword} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.hashedPassword}</p>
                </div>
                <div className='pair'>
                    <div className='align'>
                        <div className='inputName'>
                        <label>Repeat the password: </label>
                        </div>    
                        <input type='password' name='repeat' value={inputs.repeat} onChange={(e)=>handleChange(e)}></input>
                    </div>                    
                    <p className="danger">{errors.repeat}</p>
                </div>                
                {appear(critic,'Rellene todos los campos.')}
                <div className='button-cont'>
                    <button type='submit'>Registrarse</button>
                </div>
                
            </form> 
            <Log type="register"/>            
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
