import React,{useState} from 'react';
import {validate} from './validate';
import {BsFillExclamationTriangleFill} from 'react-icons/bs'
// import {useHistory} from 'react-router-dom'
import './FormNewUser.css'
import axios from 'axios'
import { url } from '../../constantURL';

function FormNewUser() {
    const [inputs,setInputs]=useState({repeat:''});
    const [errors,setErrors]=useState({});
    const [critic,setCritic]=useState(false);

    // let history= useHistory();

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

    // const send= async (body)=>{
    //     try{
    //         await axios.post(`${url}/users/register`,body)
    //         alert('Usuario Creado con éxito');
    //         history.push('/home')
    //     }catch(err) {
    //         console.error(err)
    //         alert('Ocurrió un problema y no se pudo crear el usuario')
    //     }
    // }

    const onSubmit=async (e)=>{
        e.preventDefault();
        setErrors(validate({
            ...inputs
        }))
        if(Object.values(errors).length===0){
            try{
                const {email,userName,hashedPassword}=inputs
                const body={email,userName,hashedPassword};
                await axios.post(`${url}/users/register`,body)
                alert('usuario creado con éxito.')
            }catch(err) {
                console.error(err)
                alert('Ocurrió un error y no se pudo crear el usuario')
            }
        }else setCritic(true);
    }


    return (
        <div>
            <form onSubmit={(e)=>onSubmit(e)} className='containeer'>
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
                {appear(critic)}
                <div className='button-cont'>
                    <button type='submit'>Registrarse</button>
                </div>
                
            </form>            
        </div>
    )
}
const appear=(value)=>{
    if(value){
        return(
            <div className='critic_i'>
                <BsFillExclamationTriangleFill className='dangerIcon'/>
                <div className='critic'>
                    <p className='alert-text'>Rellene todos los campos.</p>
                </div>                    
            </div>
        )
    }
}

export default FormNewUser
