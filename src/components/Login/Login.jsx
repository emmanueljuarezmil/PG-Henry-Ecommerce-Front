import React,{useState} from 'react'
import Log from '../log/log'
import axios from 'axios'
import {url} from '../../constantURL'
import Cookies from 'universal-cookie';

const backUrl = url

function Login() {
    const [inputs,setInputs]=useState({});

    const handleChange= (e)=>{
        e.preventDefault();
        setInputs({
            ...inputs,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit= async (e) =>{
        e.preventDefault();
        const body= inputs
        console.log(body)
        try{
            const {data} = await axios.post(`${backUrl}/users/login`, body);
            const {id} = data
            const cookies = new Cookies();
            cookies.set('id', id, { path: '/' });
            console.log(data)
        }catch(err){
            alert(err)
        };
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Email: </label>
                            <input type='text' name='email' value={inputs.email} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Contraseña: </label>
                            <input type='password' name='hashedPassword' value={inputs.hashedPassword} onChange={handleChange}/>
                        </div>
                    </div>
                    <button type='submit'>Ingresar</button>
                </form>
            </div>
            <div>
                <p>Iniciar sesión con cuenta de google entra dale</p>
                <Log/>
            </div> 
        </div>        
    )
}

export default Login
