import React,{useState} from 'react'
import Log from '../log/log'
import axios from 'axios'

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
        // const body=inputs;
        try{
            axios.get();
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
                            <label>Nombre de usuario: </label>
                            <input type='text' name='userName' value={inputs.userName} onChange={handleChange}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Contraseña: </label>
                            <input type='text' name='hashedPassword' value={inputs.hashedPassword} onChange={handleChange}/>
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
