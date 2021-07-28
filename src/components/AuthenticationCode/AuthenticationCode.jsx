import React, {useState} from 'react';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie'
import { useDispatch, useSelector } from "react-redux";
import { authenticationByCode } from '../../Redux/Actions'
import axios from 'axios'
import { url } from "../../constantURL"
import {headers} from '../../controllers/GetHeaders'

const AuthenticationCode = () => {
    const dispatch = useDispatch()
    const validated = useSelector(state => state.authenticatedByCode)
    const [code, setCode] = useState('')
    const cookies = new Cookies();   
    const onSubmit = async (e) => {
        e.preventDefault()
        if(validated) Swal.fire('Tu cuenta ya está verificada')
        else {
            try{
                const idUser = await cookies.get("id")
                const {data} = await axios.get(`${url}/users/authenticationByCode/${idUser}?authenticationCode=${code}`, {headers})
                if(data) {
                    dispatch(authenticationByCode(data))
                    Swal.fire("Su cuenta ha sido verificada");
                }
                else {
                    Swal.fire("Código de verificación incorrecto");
                }
            } catch(err) {
                console.error(err)
                Swal.fire("Código de verificación incorrecto");
            }
        }
    }
    const setInputCode = (e) => {
        setCode(e.target.value)
    }

    return (
        <div>
            <h2>Ingresa tu codigo aca</h2>
            <form onSubmit={onSubmit}>
                <input type="text" value={code} onChange={setInputCode}></input>
                <button type="submit">Valida tu cuenta</button> 
            </form>
        </div>
    )
};

export default AuthenticationCode;
